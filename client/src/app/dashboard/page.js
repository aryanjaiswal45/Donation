'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { donationApi } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import DashboardStats from '@/components/DashboardStats';
import DonationCard from '@/components/DonationCard';

export default function UserDashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user) return router.push('/login');
            if (user.role === 'admin') return router.push('/admin');
            fetchDonations();
        }
    }, [user, authLoading]);

    const fetchDonations = async () => {
        try {
            const res = await donationApi.getAll();
            setDonations(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    const stats = [
        {
            icon: '📦',
            value: donations.length,
            label: 'Total Donations',
            trend: 'up',
            trendLabel: 'All time',
        },
        {
            icon: '⏳',
            value: donations.filter((d) => d.status === 'Pending').length,
            label: 'Pending',
            trend: 'neutral',
            trendLabel: 'Awaiting',
        },
        {
            icon: '✅',
            value: donations.filter((d) => d.status === 'Completed').length,
            label: 'Completed',
            trend: 'up',
            trendLabel: 'Delivered',
        },
        {
            icon: '🚚',
            value: donations.filter((d) => d.status === 'Assigned').length,
            label: 'In Transit',
            trend: 'neutral',
            trendLabel: 'Active',
        },
    ];

    return (
        <div className="flex">
            <Sidebar role="user" />
            <div className="flex-1 p-6 lg:p-8 dashboard-container">
                <div className="mb-8">
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800">
                        Welcome back, <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{user.name}</span> 👋
                    </h1>
                    <p className="text-slate-500 mt-1">Here&apos;s an overview of your donations</p>
                </div>

                <div className="mb-8">
                    <DashboardStats stats={stats} />
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">Recent Donations</h2>
                    <button
                        onClick={() => router.push('/dashboard/donate')}
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                    >
                        + New Donation
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
                    </div>
                ) : donations.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-slate-100">
                        <p className="text-4xl mb-4">🥗</p>
                        <p className="text-slate-500 font-medium">No donations yet. Start sharing food!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {donations.map((donation) => (
                            <DonationCard key={donation._id} donation={donation} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

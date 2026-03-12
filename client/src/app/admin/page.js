'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { donationApi } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import DashboardStats from '@/components/DashboardStats';
import TicketTable from '@/components/TicketTable';

export default function AdminDashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user) return router.push('/login');
            if (user.role !== 'admin') return router.push('/dashboard');
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

    const handleStatusChange = async (id, status) => {
        try {
            await donationApi.updateStatus(id, status);
            fetchDonations();
        } catch (err) {
            console.error(err);
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
        { icon: '📋', value: donations.length, label: 'Total Tickets', trend: 'up', trendLabel: 'All' },
        { icon: '⏳', value: donations.filter((d) => d.status === 'Pending').length, label: 'Pending', trend: 'neutral', trendLabel: 'Review' },
        { icon: '✅', value: donations.filter((d) => d.status === 'Verified').length, label: 'Verified', trend: 'up', trendLabel: 'Ready' },
        { icon: '🚚', value: donations.filter((d) => d.status === 'Assigned').length, label: 'Assigned', trend: 'neutral', trendLabel: 'Active' },
    ];

    return (
        <div className="flex">
            <Sidebar role="admin" />
            <div className="flex-1 p-6 lg:p-8 dashboard-container">
                <div className="mb-8">
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800">Admin Dashboard</h1>
                    <p className="text-slate-500 mt-1">Manage all donation tickets and pickups</p>
                </div>

                <div className="mb-8">
                    <DashboardStats stats={stats} />
                </div>

                <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Tickets</h2>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
                    </div>
                ) : (
                    <TicketTable
                        donations={donations.slice(0, 10)}
                        onStatusChange={handleStatusChange}
                        isAdmin
                    />
                )}
            </div>
        </div>
    );
}

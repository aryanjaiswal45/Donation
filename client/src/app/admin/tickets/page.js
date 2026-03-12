'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { donationApi } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import TicketTable from '@/components/TicketTable';

export default function AdminTicketsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!authLoading) {
            if (!user) return router.push('/login');
            if (user.role !== 'admin') return router.push('/dashboard');
        }
    }, [user, authLoading]);

    useEffect(() => {
        if (user?.role === 'admin') fetchDonations();
    }, [user, statusFilter, search]);

    const fetchDonations = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (statusFilter !== 'all') params.append('status', statusFilter);
            if (search) params.append('search', search);
            const res = await donationApi.getAll(params.toString());
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

    const statuses = ['all', 'Pending', 'Verified', 'Assigned', 'Completed', 'Expired'];

    return (
        <div className="flex">
            <Sidebar role="admin" />
            <div className="flex-1 p-6 lg:p-8 dashboard-container">
                <div className="mb-8">
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800">
                        Ticket Management
                    </h1>
                    <p className="text-slate-500 mt-1">View, filter, and manage all donation tickets</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        {/* Search */}
                        <div className="flex-1 w-full">
                            <input
                                type="text"
                                placeholder="🔍  Search by food name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition"
                            />
                        </div>

                        {/* Status filter tabs */}
                        <div className="flex flex-wrap gap-2">
                            {statuses.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStatusFilter(s)}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${statusFilter === s
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {s === 'all' ? 'All' : s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results count */}
                <p className="text-sm text-slate-500 mb-4">
                    Showing <strong className="text-slate-700">{donations.length}</strong> ticket(s)
                </p>

                {/* Table */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
                    </div>
                ) : (
                    <TicketTable
                        donations={donations}
                        onStatusChange={handleStatusChange}
                        isAdmin
                    />
                )}
            </div>
        </div>
    );
}

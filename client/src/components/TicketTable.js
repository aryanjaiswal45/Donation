'use client';

import { useState } from 'react';
import StatusBadge from './StatusBadge';
import Modal from './Modal';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:5000';

export default function TicketTable({ donations, onStatusChange, isAdmin = false }) {
    const [modal, setModal] = useState({ open: false, id: null, status: '' });

    const statuses = ['Pending', 'Verified', 'Assigned', 'Completed', 'Expired'];

    const handleStatusClick = (id, newStatus) => {
        setModal({ open: true, id, status: newStatus });
    };

    const confirmStatusChange = () => {
        onStatusChange(modal.id, modal.status);
        setModal({ open: false, id: null, status: '' });
    };

    if (!donations.length) {
        return (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-slate-100">
                <p className="text-4xl mb-4">📭</p>
                <p className="text-slate-500 font-medium">No donation tickets found</p>
            </div>
        );
    }

    return (
        <>
            <div className="ticket-table bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                                <th className="text-left px-6 py-4 font-semibold text-slate-600">Food</th>
                                <th className="text-left px-6 py-4 font-semibold text-slate-600">Type</th>
                                <th className="text-left px-6 py-4 font-semibold text-slate-600">Qty</th>
                                {isAdmin && (
                                    <th className="text-left px-6 py-4 font-semibold text-slate-600">Donor</th>
                                )}
                                <th className="text-left px-6 py-4 font-semibold text-slate-600">Pickup</th>
                                <th className="text-left px-6 py-4 font-semibold text-slate-600">Expiry</th>
                                <th className="text-left px-6 py-4 font-semibold text-slate-600">Status</th>
                                {isAdmin && (
                                    <th className="text-left px-6 py-4 font-semibold text-slate-600">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {donations.map((d) => (
                                <tr key={d._id} className="hover:bg-slate-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {d.hasImage ? (
                                                <img
                                                    src={d.image && d.image.contentType
                                                        ? `${API_HOST}/api/donations/${d._id}/image`
                                                        : `${API_HOST}${d.imageUrl}`
                                                    }
                                                    alt={d.foodName}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg">
                                                    🍽
                                                </div>
                                            )}
                                            <span className="font-medium text-slate-700">{d.foodName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${d.foodType.toLowerCase() === 'veg'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {d.foodType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{d.quantity}</td>
                                    {isAdmin && (
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-slate-700">{d.donorId?.name}</p>
                                                <p className="text-xs text-slate-400">{d.donorId?.email}</p>
                                            </div>
                                        </td>
                                    )}
                                    <td className="px-6 py-4 text-slate-600 max-w-[200px] truncate">
                                        {d.pickupLocation}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {new Date(d.expiryTime).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={d.status} />
                                    </td>
                                    {isAdmin && (
                                        <td className="px-6 py-4">
                                            <select
                                                className="text-xs border border-slate-300 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                                                value={d.status}
                                                onChange={(e) => handleStatusClick(d._id, e.target.value)}
                                            >
                                                {statuses.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={modal.open}
                onClose={() => setModal({ open: false, id: null, status: '' })}
                onConfirm={confirmStatusChange}
                title="Update Ticket Status"
                message={`Are you sure you want to change the status to "${modal.status}"?`}
                confirmText="Update Status"
            />
        </>
    );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminLinks = [
    { href: '/admin', label: 'Overview', icon: '📊' },
    { href: '/admin/tickets', label: 'Tickets', icon: '🎫' },
];

const userLinks = [
    { href: '/dashboard', label: 'Overview', icon: '📊' },
    { href: '/dashboard/donate', label: 'Donate Food', icon: '🍲' },
];

export default function Sidebar({ role = 'user' }) {
    const pathname = usePathname();
    const links = role === 'admin' ? adminLinks : userLinks;

    return (
        <aside className="w-64 min-h-[calc(100vh-64px)] bg-white border-r border-slate-200 p-4 hidden lg:block">
            <div className="space-y-1">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                                }`}
                        >
                            <span className="text-lg">{link.icon}</span>
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}

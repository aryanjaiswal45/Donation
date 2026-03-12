'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-green-700 sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                            <span className="text-green-700 font-bold text-lg">🍽</span>
                        </div>
                        <span className="text-xl font-bold text-white">
                            FoodShare
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-white/90 hover:text-white transition font-medium">
                            Home
                        </Link>
                        {user ? (
                            <>
                                {user.role === 'admin' ? (
                                    <>
                                        <Link href="/admin" className="text-white/90 hover:text-white transition font-medium">
                                            Dashboard
                                        </Link>
                                        <Link href="/admin/tickets" className="text-white/90 hover:text-white transition font-medium">
                                            Tickets
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/dashboard" className="text-white/90 hover:text-white transition font-medium">
                                            Dashboard
                                        </Link>
                                        <Link href="/dashboard/donate" className="text-white/90 hover:text-white transition font-medium">
                                            Donate Food
                                        </Link>
                                    </>
                                )}
                                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">{user.name}</span>
                                    <button
                                        onClick={logout}
                                        className="text-sm text-red-100 hover:text-white font-medium transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-5 py-2 text-sm font-medium text-green-700 bg-white rounded-xl hover:bg-green-50 transition-all"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        <Link href="/" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                        {user ? (
                            <>
                                {user.role === 'admin' ? (
                                    <>
                                        <Link href="/admin" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                                        <Link href="/admin/tickets" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition" onClick={() => setMenuOpen(false)}>Tickets</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/dashboard" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                                        <Link href="/dashboard/donate" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition" onClick={() => setMenuOpen(false)}>Donate Food</Link>
                                    </>
                                )}
                                <button onClick={() => { logout(); setMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition" onClick={() => setMenuOpen(false)}>Login</Link>
                                <Link href="/register" className="block px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition" onClick={() => setMenuOpen(false)}>Register</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

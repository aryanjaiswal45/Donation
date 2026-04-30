import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                                <span className="text-white text-xl">🍽️</span>
                            </div>
                            <span className="text-white font-bold text-2xl tracking-tight">FoodShare</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Bridging the gap between surplus food and those who need it. Join our mission to reduce waste and nourish communities.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                                <span className="text-xs">FB</span>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                                <span className="text-xs">TW</span>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                                <span className="text-xs">IG</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/" className="hover:text-green-500 transition-colors">Home</Link></li>
                            <li><Link href="/dashboard" className="hover:text-green-500 transition-colors">My Donations</Link></li>
                            <li><Link href="/register" className="hover:text-green-500 transition-colors">Register as Donor</Link></li>
                            <li><Link href="/login" className="hover:text-green-500 transition-colors">Login</Link></li>
                        </ul>
                    </div>

                    {/* Agenda Section */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Our Agenda</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <span className="text-green-500">✔</span>
                                <span>Zero Food Waste</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-500">✔</span>
                                <span>Nourishing Local NGOs</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-500">✔</span>
                                <span>Real-time Logistics</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-500">✔</span>
                                <span>Community Building</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-center gap-3">
                                <span>📍</span>
                                <span>Alpha 2, Greater Noida, Uttar Pradesh, India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span>📧</span>
                                <span>foodshare@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span>📞</span>
                                <span>+91 8584858485</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} FoodShare. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-slate-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

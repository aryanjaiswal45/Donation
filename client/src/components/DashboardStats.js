export default function DashboardStats({ stats }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">{stat.icon}</span>
                        <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stat.trend === 'up'
                                    ? 'bg-emerald-100 text-emerald-600'
                                    : stat.trend === 'down'
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-slate-100 text-slate-600'
                                }`}
                        >
                            {stat.trendLabel || '—'}
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}

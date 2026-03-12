export default function StatusBadge({ status }) {
    const styles = {
        Pending: 'bg-amber-100 text-amber-700 border-amber-200',
        Verified: 'bg-blue-100 text-blue-700 border-blue-200',
        Assigned: 'bg-purple-100 text-purple-700 border-purple-200',
        Completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        Expired: 'bg-red-100 text-red-700 border-red-200',
    };

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
        >
            {status}
        </span>
    );
}

import StatusBadge from './StatusBadge';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:5000';

export default function DonationCard({ donation }) {
    const {
        foodName,
        quantity,
        foodType,
        expiryTime,
        pickupLocation,
        contactNumber,
        imageUrl,
        status,
        createdAt,
        notes,
    } = donation;

    return (
        <div className="donation-card bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group">
            {/* Image */}
            <div className="relative h-48 bg-green-50 overflow-hidden">
                {imageUrl ? (
                    <img
                        src={`${API_HOST}${imageUrl}`}
                        alt={foodName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-5xl opacity-50">🍽️</span>
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <StatusBadge status={status} />
                </div>
                <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${foodType.toLowerCase() === 'veg'
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-orange-100 text-orange-700 border border-orange-200'
                        }`}>
                        {foodType.toLowerCase() === 'veg' ? '🟢' : '🔴'} {foodType}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-slate-800 mb-3">{foodName}</h3>

                <div className="space-y-2 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <span>📦</span>
                        <span>Qty: <strong className="text-slate-700">{quantity}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>⏰</span>
                        <span>Expires: <strong className="text-slate-700">{new Date(expiryTime).toLocaleString()}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span className="truncate">{pickupLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>📞</span>
                        <span>{contactNumber}</span>
                    </div>
                </div>

                {notes && (
                    <p className="mt-3 text-sm text-slate-400 italic border-t border-slate-100 pt-3">
                        {notes}
                    </p>
                )}

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
                    Created: {new Date(createdAt).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
}

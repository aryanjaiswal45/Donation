export default function FormInput({ label, id, type = 'text', required = false, ...props }) {
    const isTextarea = type === 'textarea';
    const isSelect = type === 'select';

    const baseClass =
        'w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition';

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
                {label} {required && <span className="text-red-400">*</span>}
            </label>

            {isTextarea ? (
                <textarea id={id} className={`${baseClass} min-h-[100px] resize-y`} required={required} {...props} />
            ) : isSelect ? (
                <select id={id} className={baseClass} required={required} {...props}>
                    {props.children}
                </select>
            ) : (
                <input id={id} type={type} className={baseClass} required={required} {...props} />
            )}
        </div>
    );
}

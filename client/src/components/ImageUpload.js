'use client';

import { useState, useRef } from 'react';

export default function ImageUpload({ onFileSelect, preview, setPreview }) {
    const inputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            // Revoke old blob URL to prevent memory leak
            if (preview) {
                URL.revokeObjectURL(preview);
            }
            onFileSelect(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div
            className={`food-upload-form relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
            />

            {preview ? (
                <div className="relative">
                    <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto max-h-48 rounded-xl object-cover"
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onFileSelect(null);
                            setPreview(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-red-600 transition"
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <>
                    <div className="text-4xl mb-3">📷</div>
                    <p className="text-sm font-medium text-slate-600">
                        Drag & drop an image or <span className="text-blue-600">browse</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">JPEG, PNG, WebP up to 5MB</p>
                </>
            )}
        </div>
    );
}

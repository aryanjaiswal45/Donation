'use client';

import { useRef } from 'react';

export default function ImageUpload({ onFileSelect, preview, setPreview }) {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Validate size (5MB max)
        if (selectedFile.size > 5 * 1024 * 1024) {
            alert('File size exceeds 5MB limit');
            return;
        }

        // Validate type
        if (!selectedFile.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        onFileSelect(selectedFile);

        // Generate preview
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(selectedFile);
    };

    const handleRemove = () => {
        onFileSelect(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div>
            {preview ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors shadow-lg"
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
                >
                    <span className="text-3xl mb-2">📷</span>
                    <p className="text-sm font-medium text-slate-500">Click to upload food image</p>
                    <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP • Max 5MB</p>
                </div>
            )}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
        </div>
    );
}

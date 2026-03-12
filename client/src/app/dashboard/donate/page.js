'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { donationApi } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import FormInput from '@/components/FormInput';
import ImageUpload from '@/components/ImageUpload';

export default function DonatePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [form, setForm] = useState({
        foodName: '',
        quantity: '',
        foodType: 'veg',
        expiryTime: '',
        pickupLocation: '',
        contactNumber: '',
        notes: '',
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) router.push('/login');
    }, [user, authLoading]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const formData = new FormData();
            Object.keys(form).forEach((key) => formData.append(key, form[key]));
            if (image) formData.append('image', image);

            await donationApi.create(formData);
            setSuccess('🎉 Donation ticket created successfully!');
            setForm({
                foodName: '',
                quantity: '',
                foodType: 'veg',
                expiryTime: '',
                pickupLocation: '',
                contactNumber: '',
                notes: '',
            });
            setImage(null);
            setPreview(null);

            // Redirect after brief delay
            setTimeout(() => router.push('/dashboard'), 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    return (
        <div className="flex">
            <Sidebar role="user" />
            <div className="flex-1 p-6 lg:p-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800">Donate Food</h1>
                        <p className="text-slate-500 mt-1">Fill in the details to create a donation ticket</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                        {error && (
                            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-6 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl text-sm">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Image upload */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Food Image
                                </label>
                                <ImageUpload onFileSelect={setImage} preview={preview} setPreview={setPreview} />
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <FormInput
                                    label="Food Name"
                                    id="foodName"
                                    required
                                    placeholder="e.g. Biryani, Bread, Fruits"
                                    value={form.foodName}
                                    onChange={handleChange}
                                />

                                <FormInput
                                    label="Quantity"
                                    id="quantity"
                                    required
                                    placeholder="e.g. 5 kg, 10 plates"
                                    value={form.quantity}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <FormInput
                                    label="Food Type"
                                    id="foodType"
                                    type="select"
                                    required
                                    value={form.foodType}
                                    onChange={handleChange}
                                >
                                    <option value="veg">🟢 Vegetarian</option>
                                    <option value="non-veg">🔴 Non-Vegetarian</option>
                                </FormInput>

                                <FormInput
                                    label="Expiry Time"
                                    id="expiryTime"
                                    type="datetime-local"
                                    required
                                    value={form.expiryTime}
                                    onChange={handleChange}
                                />
                            </div>

                            <FormInput
                                label="Pickup Address"
                                id="pickupLocation"
                                required
                                placeholder="Full address for food pickup"
                                value={form.pickupLocation}
                                onChange={handleChange}
                            />

                            <FormInput
                                label="Contact Number"
                                id="contactNumber"
                                type="tel"
                                required
                                placeholder="+91 9876543210"
                                value={form.contactNumber}
                                onChange={handleChange}
                            />

                            <FormInput
                                label="Additional Notes"
                                id="notes"
                                type="textarea"
                                placeholder="Any special instructions or details..."
                                value={form.notes}
                                onChange={handleChange}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all text-base disabled:opacity-60"
                            >
                                {loading ? 'Submitting...' : '🎫 Generate Donation Ticket'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

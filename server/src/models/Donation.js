const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
    {
        donorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        foodName: {
            type: String,
            required: [true, 'Please add food name'],
        },
        quantity: {
            type: String,
            required: [true, 'Please add quantity (e.g., "5 meals", "10 kg")'],
        },
        foodType: {
            type: String,
            enum: ['veg', 'non-veg'],
            required: [true, 'Please specify if food is veg or non-veg'],
        },
        expiryTime: {
            type: Date,
            required: [true, 'Please add expected expiry time'],
        },
        pickupLocation: {
            type: String,
            required: [true, 'Please add pickup location/address'],
        },
        contactNumber: {
            type: String,
            required: [true, 'Please add contact number for pickup'],
        },
        notes: {
            type: String,
            default: '',
        },
        image: {
            data: Buffer,
            contentType: String,
        },
        imageUrl: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['Pending', 'Verified', 'Assigned', 'Completed', 'Expired'],
            default: 'Pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Donation', donationSchema);

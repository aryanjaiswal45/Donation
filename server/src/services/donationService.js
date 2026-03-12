const Donation = require('../models/Donation');

exports.createDonation = async (donationData) => {
    const donation = await Donation.create(donationData);
    await donation.populate('donorId', 'name email phone');
    return donation;
};

exports.getDonations = async (filters, role, userId) => {
    const query = {};

    // Users see their own, admins see all
    if (role === 'user') {
        query.donorId = userId;
    }

    if (filters.status) {
        query.status = filters.status;
    }

    // Search by food name (case-insensitive)
    if (filters.search) {
        query.foodName = { $regex: filters.search, $options: 'i' };
    }

    const donations = await Donation.find(query)
        .populate('donorId', 'name email phone')
        .sort({ createdAt: -1 });

    return donations;
};

exports.updateDonationStatus = async (id, status) => {
    const donation = await Donation.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    );
    if (!donation) {
        throw new Error('Donation not found');
    }
    return donation;
};

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
        .select('-image.data')
        .populate('donorId', 'name email phone')
        .sort({ createdAt: -1 })
        .lean();

    // Debug log to see what the data looks like (safe to remove after fixing)
    if (donations.length > 0) {
        console.log('🔍 First donation sample:', {
            id: donations[0]._id,
            foodName: donations[0].foodName,
            hasImageField: !!donations[0].image,
            contentType: donations[0].image?.contentType,
            legacyUrl: donations[0].imageUrl
        });
    }

    // Add a hasImage flag so frontend knows whether an image exists
    const donationsWithFlag = donations.map((d) => {
        // Safe check for binary image
        const hasBinaryImage = !!(d.image && d.image.contentType);
        
        // Safe check for legacy image (handling null/undefined/empty)
        const hasLegacyImage = !!(d.imageUrl && typeof d.imageUrl === 'string' && d.imageUrl.trim() !== '');

        return {
            ...d,
            hasImage: hasBinaryImage || hasLegacyImage,
        };
    });

    // Logging summarized results for debugging
    console.log(`📡 Returning ${donationsWithFlag.length} donations. Images found: ${donationsWithFlag.filter(d => d.hasImage).length}`);

    return donationsWithFlag;
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

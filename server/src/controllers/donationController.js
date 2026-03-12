const donationService = require('../services/donationService');

exports.createDonation = async (req, res) => {
    try {
        const donationData = {
            ...req.body,
            donorId: req.user.id,
        };

        if (req.file) {
            donationData.imageUrl = `/uploads/${req.file.filename}`;
        }

        const donation = await donationService.createDonation(donationData);
        res.status(201).json({ success: true, data: donation });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getDonations = async (req, res) => {
    try {
        const filters = { status: req.query.status, search: req.query.search };
        const donations = await donationService.getDonations(filters, req.user.role, req.user.id);
        res.status(200).json({ success: true, count: donations.length, data: donations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const donation = await donationService.updateDonationStatus(req.params.id, status);
        res.status(200).json({ success: true, data: donation });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

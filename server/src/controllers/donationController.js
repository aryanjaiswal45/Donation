const donationService = require('../services/donationService');
const Donation = require('../models/Donation');

exports.createDonation = async (req, res) => {
    try {
        const donationData = {
            ...req.body,
            donorId: req.user.id,
        };

        // If an image was uploaded, store its binary data in the donation document
        if (req.file) {
            console.log(`📸 Image received: ${req.file.originalname} (${req.file.size} bytes)`);
            donationData.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };
        } else {
            console.log('ℹ️ No image uploaded for this donation');
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

// Serve the image binary for a specific donation
exports.getDonationImage = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id).select('image');

        if (!donation || !donation.image || !donation.image.data) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        res.set('Content-Type', donation.image.contentType);
        res.send(donation.image.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

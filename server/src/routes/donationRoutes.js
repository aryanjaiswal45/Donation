const express = require('express');
const { createDonation, getDonations, updateStatus, getDonationImage } = require('../controllers/donationController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Move image retrieval above protect to allow direct browser access in <img> tags
router.get('/:id/image', getDonationImage);

router.use(protect); // All other donation routes require authentication

router.route('/')
    .get(getDonations)
    .post(upload.single('image'), createDonation);

router.route('/:id/status')
    .put(authorize('admin'), updateStatus); // Only admins can update status

module.exports = router;

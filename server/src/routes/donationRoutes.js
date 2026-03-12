const express = require('express');
const { createDonation, getDonations, updateStatus } = require('../controllers/donationController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.use(protect); // All donation routes require authentication

router.route('/')
    .get(getDonations)
    .post(upload.single('image'), createDonation);

router.route('/:id/status')
    .put(authorize('admin'), updateStatus); // Only admins can update status

module.exports = router;

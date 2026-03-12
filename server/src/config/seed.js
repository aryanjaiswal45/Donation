require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        const adminExists = await User.findOne({ email: 'admin@foodwaste.com' });

        if (adminExists) {
            console.log('⚠️ Admin user already exists. Updating credentials...');
            adminExists.name = 'System Admin';
            adminExists.password = 'admin123'; // This will trigger the pre-save bridge
            adminExists.role = 'admin';
            adminExists.phone = '9999999999';
            await adminExists.save();
            console.log('✅ Admin user updated successfully.');
        } else {
            await User.create({
                name: 'System Admin',
                email: 'admin@foodwaste.com',
                password: 'admin123',
                role: 'admin',
                phone: '9999999999',
            });
            console.log('✅ Admin user seeded successfully.');
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error.message);
        process.exit(1);
    }
};

seedAdmin();

const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

const test = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ email: 'admin@foodwaste.com' }).select('+password');
    console.log('User password hash:', user.password);

    // Create new user
    try {
        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test', email: 'test1234@test.com', password: 'password', phone: '1234', role: 'user'
            })
        });
        const data = await res.json();
        console.log('Register Response:', data);
    } catch (e) {
        console.error(e);
    }

    // Login
    try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@foodwaste.com', password: 'admin123'
            })
        });
        const data = await res.json();
        console.log('Login Response:', data);
    } catch (e) {
        console.error(e);
    }

    process.exit();
}

test();

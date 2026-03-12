const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.registerUser = async (userData) => {
    const { name, email, password, phone, role } = userData;

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
        role: role || 'user',
    });

    if (user) {
        return {
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: generateToken(user._id),
        };
    } else {
        throw new Error('Invalid user data');
    }
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        return {
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: generateToken(user._id),
        };
    } else {
        throw new Error('Invalid credentials');
    }
};

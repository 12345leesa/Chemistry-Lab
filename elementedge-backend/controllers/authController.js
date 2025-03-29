const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user._id, 
            username: user.username, 
            userRole: user.userRole 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
};

// User Registration
exports.register = async (req, res) => {
    try {
        const { username, indexNo, password, userRole } = req.body;

        // Validate input
        if (!username || !indexNo || !password || !userRole) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide all required fields' 
            });
        }

        // Check if user already exists
        let existingUser = await User.findOne({ 
            $or: [{ username }, { indexNo }] 
        });

        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'Username or Index Number already exists' 
            });
        }

        // Create new user
        const user = new User({
            username,
            indexNo,
            password,
            userRole
        });

        await user.save();

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during registration',
            error: error.message 
        });
    }
};

// User Login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide username and password' 
            });
        }

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        // Generate token
        const token = generateToken(user);

        res.status(200).json({ 
            success: true, 
            token, 
            user: {
                id: user._id,
                username: user.username,
                userRole: user.userRole
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during login',
            error: error.message 
        });
    }
};

// Middleware to protect routes
exports.protect = async (req, res, next) => {
    let token;

    // Check Authorization header
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user and attach to request (excluding password)
            const user = await User.findById(decoded.id).select('-password');
            
            if (!user) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'User not found' 
                });
            }

            // Attach user to request
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ 
                success: false, 
                message: 'Not authorized, token failed',
                error: error.message 
            });
        }
    }

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Not authorized, no token' 
        });
    }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        // req.user is available from the protect middleware
        res.json({
            success: true,
            user: req.user
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching user profile',
            error: error.message 
        });
    }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { username } = req.body;

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id, 
            { username }, 
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        res.json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error updating user profile',
            error: error.message 
        });
    }
};
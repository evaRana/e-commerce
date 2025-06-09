const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Load full user document (without password)
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;  // full user document with _id
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is invalid or expired' });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Admin access only' });
    }
};

module.exports = { protect, adminOnly };


// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// const protect = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Not authorized, no token' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Token is invalid or expired' });
//     }
// };
// const adminOnly = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         next();
//     } else {
//         res.status(403).json({ message: 'Admin access only' });
//     }
// };
// module.exports = { protect , adminOnly };

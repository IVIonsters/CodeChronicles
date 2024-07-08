const router = require('express').Router();
const { User } = require('../../models');

// Create a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (password.length < 8) {
            res.status(400).json({ message: 'Password Invalid, Must contain 8 characters or more' });
            return;
        }
        const userData = await User.create({ username, email, password });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({user: userData, message: 'New user created!' });
        });
    } catch (error) {
        console.error('Error creating new user: ', error);
        res.status(500).json(error);
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

// Logout a user
router.post('/logout', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

module.exports = router;
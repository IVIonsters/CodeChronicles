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
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        const validatePassword = await userData.checkPassword(req.body.password);

        if (!validatePassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Login Successful, Welcome!' });
        });
    } catch (error) {
        console.error('Error logging in user: ', error);
        res.status(500).json(error);
        
    }
});

// Logout a user
router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
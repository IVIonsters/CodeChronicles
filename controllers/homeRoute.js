const router = require('express').Router();
const withAuth = require('../utils/auth');
const { formatDate } = require('../utils/date.js');
const { User, Post, Comment } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const posts = postData.map((post) => {
            let plainPost = post.get({ plain: true });
            plainPost.formattedDate = formatDate(plainPost.created_on);
            return plainPost;
        });

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            pageTitle: 'CodeChronicles',
        });
    } catch (err) {
        console.error('homepage route error', err);
        res.status(500).json(err);
    }
});
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

// GET one post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }],
        });
        if (!postData) {
            res.status(404).json({ message: 'No Post found, incorrect ID' });
            return;
        }
        const post = postData.get({ plain: true });
        post.formattedDate = formatDate(post.created_on);

        res.render('posts', {
            ...post,
            loggedIn: req.session.loggedIn,
            pageTitle: 'Single Post',
        });
    } catch (error) {
        console.error('post route error', error);
        res.status(500).json(error);
    }
});

//Dashboard route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userId, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Post,
                where: {
                    userId: req.session.user_id,
                },
                required: false,
            }],
        });
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        const user = userData.get({ plain: true });
        user.posts = user.posts.map((post) => {
            post.formattedDate = formatDate(post.created_on);
            return post;
        });

        res.render('dashboard', {
            ...user,
            loggedIn: true,
            pageTitle: 'Dashboard',
        });
    } catch (err) {
        console.error('dashboard route error', err);
        res.status(500).json(err);
    }
});
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { formateDate } = require('../../utils/date.js');
const { Post, User } = require('../../models');

// GET all posts for dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }],
        });
        const posts = postData.map((post) => {
            const plainPost = post.get({ plain: true });
            postPlain.formateDate = formateDate(plainPost.creationDate);
            return plainPost;
        });
        res.render('homepage', { posts, logged_in: req.session.logged_in });
    } catch (error) {
        console.error('Error in retrieving posts: ', error);
        res.status(500).json(error);
    }
});

//Post route
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.status(200).json(newPost);
    } catch (error) {
        console.error('Error in creating post: ', error);
        res.status(500).json(error);
    }
});
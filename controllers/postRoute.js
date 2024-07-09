const router = require('express').Router();
const withAuth = require('../utils/auth.js');
const { formateDate } = require('../utils/date.js');
const { Post, User } = require('../models/index.js');

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

//Update post route
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [updatedPost] = await Post.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });
        if (updatedPost > 0) {
            res.status(200).end();
        } else {
            res.status(404).json({ message: 'No post found with this id!' });
        }
    } catch (error) {
        console.error('Error in updating post: ', error);
        res.status(500).json(error);
    }
});

//Delete post route
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.findByPk(req.params.id);
        if (!deletedPost) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        if (deletedPost.userId !== req.session.userId) {
            res.status(403).json({ message: 'You cannot delete this post!' });
            return;
        }
        await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });
    } catch (error) {
        console.error('Error in deleting post: ', error);
        res.status(500).json(error);
    }
});

module.exports = router;
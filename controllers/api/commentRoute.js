const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

//Create comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.status(200).json(newComment);
    } catch (err) {
        console.error("Error, no comment created",err);
        res.status(400).json(err);
    }
});

module.exports = router;
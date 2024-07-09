// Initiate all routes in this file
const router = require('express').Router();
const homeRoutes = require('./homeRoute');
const userRoutes = require('./userRoute');
const postRoutes = require('./postRoute');
const commentRoutes = require('./commentRoute');


// Set up routes
router.use('/', homeRoutes);
router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/comments', commentRoutes);

// Export the router
module.exports = router;
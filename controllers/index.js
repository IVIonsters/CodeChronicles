// Initiate all routes in this file
const router = require('express').Router();
const userRoute = require('./userRoute');
const postRoute = require('./postRoute');
const commentRoute = require('./commentRoute');


// Set up routes
router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);

// Export the router
module.exports = router;
//Import Models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//Create Associations
User.hasMany(Post, {
    foreignKey: 'userId',
});

Post.belongsTo(User, {
    foreignKey: 'userId'
});

Post.hasMany(Comment, {
    foreignKey: 'postId'
});

Comment.belongsTo(User, {
    foreignKey: 'userId'
});

Comment.belongsTo(Post, {
    foreignKey: 'postId'
});

User.hasMany(Comment, {
    foreignKey: 'userId'
});

module.exports = { User, Post, Comment };

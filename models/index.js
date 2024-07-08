//Import Models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//Create Associations
User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'userId'
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'userId'
});

Comment.belongsTo(Post, {
    foreignKey: 'postId'
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };

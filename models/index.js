const User = require('./User');
const Sneakers = require('./Sneakers');
const Comment = require('./Comment');
const Vote = require('./Vote');

User.hasMany(Sneakers, {
    foreignKey: 'user_id'
});

Sneakers.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Sneakers, {
    through: Vote,
    as: 'voted_sneakers',
    foreignKey: 'user_id'
});

Sneakers.belongsToMany(User, {
    through: Vote,
    as: 'voted_sneakers',
    foreignKey: 'sneakers_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Sneakers, {
    foreignKey: 'sneakers_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Sneakers.hasMany(Vote, {
    foreignKey: 'sneakers_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Sneakers, {
    foreignKey: 'sneakers_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Sneakers.hasMany(Comment, {
    foreignKey: 'sneakers_id'
});

module.exports = { User, Sneakers, Vote, Comment };

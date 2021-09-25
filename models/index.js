const User = require('./User');
const Product = require('./Product');
const UserList = require('./UserList');

// Products belongsTo User
Product.belongsTo(User);

// User have many Products
User.hasMany(Product);

// Products belongToMany Tags (through ProductTag)
UserList.belongsToMany(User,{through:Product});

module.exports = {
  Product,
  User,
  UserList,
  
};
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const book = require("./models/book");
const user = require("./models/user");
const shoppingCart = require("./models/shoppingCart");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ebookspalace`, {
    logging: false,
});

const Book = book(sequelize);
const User = user(sequelize);
const ShoppingCart = shoppingCart(sequelize);

User.hasMany(ShoppingCart, { foreignKey: "userId", sourceKey: 'id' });
ShoppingCart.belongsTo(User, { foreignKey: "userId", targetKey: 'id' });

ShoppingCart.belongsToMany(Book, { through: "ShoppingCartBook", foreignKey: "shoppingCartId" });
Book.belongsToMany(ShoppingCart, { through: "ShoppingCartBook", foreignKey: "bookId" });

User.belongsToMany(Book, { through: "UserBook" });
Book.belongsToMany(User, { through: "UserBook" });

module.exports = {
    conn: sequelize,
    Book,
    User,
    ShoppingCart
};
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const book = require("./models/book");
const user = require("./models/user");
const cart = require("./models/cart");
const cartBook = require("./models/cartBook");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ebookspalace`, {
    logging: false,
});

const Book = book(sequelize);
const User = user(sequelize);
const Cart = cart(sequelize);
const CartBook = cartBook(sequelize);

User.hasMany(Cart, { foreignKey: "userId", sourceKey: 'id' });
Cart.belongsTo(User, { foreignKey: "userId", targetKey: 'id' });

Cart.belongsToMany(Book, { through: CartBook, foreignKey: "cartId" });
Book.belongsToMany(Cart, { through: CartBook, foreignKey: "bookId" });

User.belongsToMany(Book, { through: "UserBook" });
Book.belongsToMany(User, { through: "UserBook" });

module.exports = {
    conn: sequelize,
    Book,
    User,
    Cart,
    CartBook
};
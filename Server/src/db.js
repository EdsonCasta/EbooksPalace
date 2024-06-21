require("dotenv").config();
const { Sequelize } = require("sequelize");
const book = require("./models/book");
const user = require("./models/user");
const shoppingCart = require("./models/shoppingCart");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ebookspalace`, {
    logging: false,
});

const Book = book(sequelize);
const User = user(sequelize);
/* const shoppingCart = shoppingCart(sequelize);

user.hasMany(shoppingCart, { foreignKey: "userId" });
shoppingCart.belongsTo(User, { foreigKey: "userId" });

shoppingCart.belongsToMany(Book, { through: shoppingCartBook, foreignKey: shoppingCartId });
Book.belongsToMany(shoppingCart, { through: shoppingCartBook, foreignKey: bookId }); */

module.exports = {
    conn: sequelize,
    Book,
    User,
    /* shoppingCart */
};
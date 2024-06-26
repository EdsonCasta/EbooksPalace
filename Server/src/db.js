require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const book = require("./models/book");
const user = require("./models/user");
const cart = require("./models/cart");
const cartBook = require("./models/cartBook");

const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' ? {
      require: true,
      rejectUnauthorized: false // Ajusta esto según tu configuración de certificados SSL
    } : false
  },
  logging: false
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
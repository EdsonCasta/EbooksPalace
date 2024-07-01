require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const book = require("./models/book");
const user = require("./models/user");
const cart = require("./models/cart");
const cartBook = require("./models/cartBook");
const UserBookModel = require("./models/UserBook");

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
  logging: false // Opcional: desactivar el registro de consultas
});

const Book = book(sequelize);
const User = user(sequelize);
const Cart = cart(sequelize);
const CartBook = cartBook(sequelize);
const UserBook = UserBookModel(sequelize);

User.hasMany(Cart, { foreignKey: "userId", sourceKey: 'id' });
Cart.belongsTo(User, { foreignKey: "userId", targetKey: 'id' });

Cart.belongsToMany(Book, { through: CartBook, foreignKey: "cartId" });
Book.belongsToMany(Cart, { through: CartBook, foreignKey: "bookId" });

User.belongsToMany(Book, { through: UserBook });
Book.belongsToMany(User, { through: UserBook });

Cart.hasMany(CartBook, { foreignKey: "cartId" });
CartBook.belongsTo(Cart, { foreignKey: "cartId" });

Book.hasMany(CartBook, { foreignKey: "bookId" });
CartBook.belongsTo(Book, { foreignKey: "bookId" });

module.exports = {
  conn: sequelize,
  Book,
  User,
  Cart,
  CartBook,
  UserBook
};
require("dotenv").config();
const { Sequelize } = require("sequelize");
const book = require("./models/book");
const user = require("./models/user");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ebookspalace`, {
    logging: false,
});

const Book = book(sequelize);
const User = user(sequelize);

module.exports = {
    conn: sequelize,
    Book,
    User
};
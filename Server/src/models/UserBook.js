const { DataTypes } = require('sequelize');

const UserBook = (sequelize, User, Book) => {
    return sequelize.define('UserBooks', {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        bookId: {
            type: DataTypes.INTEGER,
            references: {
                model: Book,
                key: 'id'
            }
        }
    }, {
        timestamps: true
    });
}
module.exports = UserBook
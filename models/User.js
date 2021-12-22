const { DataTypes } = require('sequelize');

const sequelize = require('./sequelizeDb');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true,
            allowNull: false
        },
        login: { type: DataTypes.TEXT, allowNull: false },
        password: { type: DataTypes.TEXT, allowNull: false },
        age: { type: DataTypes.INTEGER, allowNull: false },
        isDeleted: { type: DataTypes.BOOLEAN, allowNull: false }
    },
    {
        timestamps: false,
        tableName: 'Users'
    }
);

module.exports = User;

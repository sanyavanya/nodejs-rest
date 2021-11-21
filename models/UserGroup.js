const { DataTypes } = require('sequelize');

const sequelize = require('./sequelizeDb');

const UserGroup = sequelize.define(
    'usergroup',
    {
        userid: {
            type: DataTypes.TEXT
        },
        groupid: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false,
        tableName: 'usergroup'
    }
);

module.exports = UserGroup;

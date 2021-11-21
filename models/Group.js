const { DataTypes } = require('sequelize');

const sequelize = require('./sequelizeDb');

const Group = sequelize.define(
    'group',
    {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true,
            allowNull: false
        },
        name: { type: DataTypes.TEXT, allowNull: false },
        permissions: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false }
    },
    {
        timestamps: false,
        tableName: 'groups'
    }
);

module.exports = Group;

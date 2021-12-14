const sequelize = require('./sequelizeDb');
const { DataTypes } = require('sequelize');
const User = require('./User');
const Group = require('./Group');

const UserGroup = sequelize.define(
    'UserGroup',
    {
        userId: {
            type: DataTypes.TEXT,
            references: {
                model: User,
                key: 'id'
            }
        },
        groupId: {
            type: DataTypes.TEXT,
            references: {
                model: Group,
                key: 'id'
            }
        }
    },
    {
        timestamps: false,
        tableName: 'UserGroup'
    }
);

User.belongsToMany(Group, { through: 'UserGroup', foreignKey: 'userId' });
Group.belongsToMany(User, { through: 'UserGroup', foreignKey: 'userId' });

module.exports = UserGroup;

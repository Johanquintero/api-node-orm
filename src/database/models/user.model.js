const { Model, DataTypes } = require('sequelize')

const TABLE_NAME = 'users'

const UserSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}

class User extends Model {
    static associate(models) {

    }
    static config(sequelize) {
        return { sequelize, tableName: TABLE_NAME, modelName: 'User', timestamps: false }
    }
}

module.exports = { TABLE_NAME, UserSchema, User }
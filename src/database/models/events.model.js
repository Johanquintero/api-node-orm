const { Model, DataTypes } = require('sequelize')

const TABLE_NAME = 'events'

const UserSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    init_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    init_hour: {
        type: DataTypes.TIME,
        allowNull: true
    },
    end_hour: {
        type: DataTypes.TIME,
        allowNull: false
    },
    place:{
        type: DataTypes.STRING,
        allowNull: false
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
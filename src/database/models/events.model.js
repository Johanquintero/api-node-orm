const { Model, DataTypes } = require('sequelize')

const TABLE_NAME = 'events'

const EventSchema = {
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
        this.hasMany(models.UserEvents,{as:"user_events",foreignKey:'event_id'})
    }
    static config(sequelize) {
        return { sequelize, tableName: TABLE_NAME, modelName: 'Events', timestamps: false }
    }
}

module.exports = { TABLE_NAME, EventSchema, User }
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
        allowNull: false
    },
    init_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    init_hour: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_hour: {
        type: DataTypes.TIME,
        allowNull: true
    },
    place:{
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
}

class Events extends Model {
    static associate(models) {
        this.hasMany(models.UserEvents,{as:"user_events",foreignKey:'event_id'})
    }
    static config(sequelize) {
        return { sequelize, tableName: TABLE_NAME, modelName: 'Events', timestamps: false }
    }
}

module.exports = { TABLE_NAME, EventSchema, Events }
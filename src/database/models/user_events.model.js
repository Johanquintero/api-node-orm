const { Model, DataTypes } = require('sequelize')

const TABLE_NAME = 'user_events'

const UserEventsSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    event_id: {
        field: 'event_id',
        type: DataTypes.INTEGER,
        references: {
            model: 'events',
            key: 'id'
        }
    }, status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}

class UserEvents extends Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'users', foreignKey: 'user_id' })
        this.belongsTo(models.Events, { as: 'events', foreignKey: 'event_id' })
    }
    static config(sequelize) {
        return { sequelize, tableName: TABLE_NAME, modelName: 'UserEvents', timestamps: false }
    }
}

module.exports = { TABLE_NAME, UserEventsSchema, UserEvents }
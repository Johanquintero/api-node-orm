const { Model, DataTypes } = require('sequelize')

const TABLE_NAME = 'user_events'

const UserEventsSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id:{
        field:'user_id',
        type:DataTypes.INTEGER,
        references:{
            model:'users',
            key:'id'
        }
    },
    area_id:{
        field:'area_id',
        type:DataTypes.INTEGER,
        references:{
            model:'areas',
            key:'id'
        }
    }
}

class User extends Model {
    static associate(models) {
        this.belongsTo(models.User,{as:'users',foreignKey:'user_id'})
        this.belongsTo(models.Areas,{as:'areas',foreignKey:'area_id'})
    }
    static config(sequelize) {
        return { sequelize, tableName: TABLE_NAME, modelName: 'UserEvents', timestamps: false }
    }
}

module.exports = { TABLE_NAME, UserEventsSchema, User }
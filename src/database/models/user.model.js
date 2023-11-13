const { Model, DataTypes } = require('sequelize')

const TABLE_NAME = 'users'

const UserSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
        defaultValue: true
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
        this.belongsTo(models.Areas,{as:'areas',foreignKey:'area_id'})
        this.hasMany(models.UserEvents,{as:"user_events",foreignKey:'user_id'})
    }
    static config(sequelize) {
        return { sequelize, tableName: TABLE_NAME, modelName: 'User', timestamps: false }
    }
}

module.exports = { TABLE_NAME, UserSchema, User }
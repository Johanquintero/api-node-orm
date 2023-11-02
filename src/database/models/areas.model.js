const { Model, DataTypes } = require('sequelize')

const TABLE_NAME = 'areas'

const AreasSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    observations: {
        type: DataTypes.STRING,
        allowNull: false

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}

class Areas extends Model {
    static associate(models) {

    }
    static config(sequelize) {
        return { sequelize, tableName: TABLE_NAME, modelName: 'Areas', timestamps: false }
    }
}

module.exports = { TABLE_NAME, AreasSchema, Areas }
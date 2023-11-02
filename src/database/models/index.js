const { AreasSchema, Areas } = require('./areas.model');
const { UserSchema, User } = require('./user.model')

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Areas.init(AreasSchema, Areas.config(sequelize));
    User.associate(sequelize.models)
    Areas.associate(sequelize.models)
}
module.exports = setupModels
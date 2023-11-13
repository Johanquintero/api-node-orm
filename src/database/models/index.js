const { AreasSchema, Areas } = require('./areas.model');
const { UserSchema, User } = require('./user.model')
const { EventSchema, Events } = require('./events.model')
const { UserEventsSchema, UserEvents } = require('./user_events.model')

function setupModels(sequelize) {
    Areas.init(AreasSchema, Areas.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    Events.init(EventSchema, Events.config(sequelize));
    UserEvents.init(UserEventsSchema, UserEvents.config(sequelize));

    Areas.associate(sequelize.models)
    User.associate(sequelize.models)
    Events.associate(sequelize.models)
    UserEvents.associate(sequelize.models)
}
module.exports = setupModels
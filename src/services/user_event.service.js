const { models } = require('../libs/sequelize')
const UserController = require('../controllers/user.controller')
const EventController = require('../controllers/event.controller')

class UserService {
    constructor() {
        this.model = models.User
    }

    async getAll() {
        const users = await this.model.findAll({
            include: ['events'],
            include: ['user'],
            where: { status: true }
        })
        return users;
    }

    async create(status, event_id, event, user_id, user) {

        let issetUser = UserController.findOne(user_id)
        let isseEvent = EventController.findOne(event_id)

        if (!issetUser) throw new Error("No se encuentra el usuario");
        if (!isseEvent) throw new Error("No se encuentra el evento");


        if (event_id && event) {
            throw new Error("You cand provide event_id and event on same time")
        }

        if (user_id && user) {
            throw new Error("You cand provide user_id and user on same time")
        }
        const values = { status }

        if (area_id) values.area_id = area_id
        if (user_id) values.user_id = user_id
        if (event) values.event = event
        if (user) values.user = user

        const user_event = await this.model.create(values, {
            include: [{
                association: 'events',
                association: 'user',
            }]
        })

        return user_event;
    }

    async findOne(id) {
        const user_event = await this.model.findByPk(id, {
            include: ['events'],
            include: ['user'],
        })
        return user_event
    }

    async update(id, values) {
        const event_user = await this.findOne(id)
        if (!event_user) return null
        const updateEventUser = await event_user.update(values)
        return updateEventUser
    }

    async delete(id, values) {
        const event_user = await this.model.findOne({
            where: {
                id: id,
                status: true
            }
        })
        if (!event_user) return null
        const updateEventUser = await event_user.update(values)
        return updateEventUser
    }

}

module.exports = UserService
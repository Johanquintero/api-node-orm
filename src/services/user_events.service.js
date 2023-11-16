const { models } = require('../libs/sequelize')
const UserController = require('../controllers/area.controller')
const EventController = require('../controllers/event.controller')
const { where } = require('sequelize')

class UserService {
    constructor() {
        this.model = models.UserEvents
    }

    async getAll() {
        try {
            const users = await this.model.findAll({
                include: ['events', 'users'],
                where: { status: true }
            })
            return users;
        } catch (error) {
            console.log("ERROR AL CREAR USER EVENT", error)
        }
    }

    async create(status, event_id, event, user_id, user) {
        if (event_id && event) {
            throw new Error("You cand provide event_id and event on same time")
        }

        if (user_id && user) {
            throw new Error("You cand provide user_id and user on same time")
        }
        const values = { status }

        if (event_id) values.event_id = event_id
        if (user_id) values.user_id = user_id
        if (event) values.event = event
        if (user) values.user = user

        const user_event = await this.model.create(values, {
            include: [{
                association: 'events',
                association: 'users',
            }]
        })

        return user_event;
    }

    async findAll(user_id, event_id) {
        let user_event = ""
        if (user_id && !event_id) {
            user_event = await this.model.findAll({
                include: [{as:'events',model:models.Events,where:{status:true}}, 'users'],
                where: { user_id }
            })
        } else if (event_id && !user_id) {
            user_event = await this.model.findAll({
                include: [{as:'events',model:models.Events,where:{status:true}}, 'users'],
                where: { event_id }
            })
        } else {
            user_event = await this.model.findAll({
                include: [{model:'events',where:{status:true}}, 'users'],
                where: {
                    user_id,
                    event_id
                }
            })
        }
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
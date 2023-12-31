const UserEventService = require('../services/user_events.service')

class UserEventController {
    constructor() {
        this.service = new UserEventService
    }

    async index() {
        const userEvents = await this.service.getAll()

        return userEvents
    }

    async create(status, event_id, event, user_id, user) {
        const userEvent = await this.service.create(status, event_id, event, user_id, user)

        return userEvent
    }

    async findAll(user_id, event_id) {
        const userEvent = await this.service.findAll(user_id, event_id)

        if (!userEvent) {
            throw new Error("No se encuentra el evento")
        }

        return userEvent
    }

    async update(id, values) {
        const userEvent = await this.service.update(id, values)

        if (!userEvent) throw new Error("Evento no existe")

        return userEvent
    }

    async delete(id, values) {
        const userEvent = await this.service.delete(id, values)

        if (!userEvent) {
            throw new Error("Evento no asociado")
        }

        let message = "El usuario quedo inactivo del evento"

        return message
    }
}

module.exports = UserEventController
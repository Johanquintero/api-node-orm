const moment = require('moment/moment')
const EventService = require('../services/event.service')

class EventController {
    constructor() {
        this.service = new EventService
    }

    async index(question) {
        const events = await this.service.getAll(question)

        return events
    }

    async create(name, init_date, end_date, init_hour, end_hour, place, status) {
        let date = moment(init_date).format("YYYY-MM-DD");
        let request = await this.index({ status: true, "init_date": date, init_hour })
        if (request.length > 0) {
            return { "message": "La fecha y hora del evento ya esta en uso", "status": false }
        }

        const event = await this.service.create(name, init_date, end_date, init_hour, end_hour, place, status)
        return event
    }

    async findOne(id) {
        const event = await this.service.findOne(id)
        if (!event) {
            return { "message": "Evento no encontrado", "status": false }
        }

        return { event, "status": true }
    }

    async update(id, values) {
        const event = await this.service.update(id, values)

        if (!event) throw new Error("Este evento no existe")

        return event
    }

    async delete(id, values) {
        const event = await this.service.delete(id, values)

        if (!event) {
            throw new Error("Evento no encontrado")
        }

        let message = "El evento quedo inactivo"

        return message
    }
}

module.exports = EventController
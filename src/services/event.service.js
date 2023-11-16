const { models } = require('../libs/sequelize')

class EventService {
    constructor() {
        this.model = models.Events
    }

    async getAll(question) {
        let events = ''
        if (!question) {
            events = await this.model.findAll({
                where: { status: true }
            })
        } else {
            events = await this.model.findAll({
                where: question
            })
        }

        return events;
    }

    async create(name, init_date, end_date, init_hour, end_hour, place, status) {
        try {
            if (!name, !init_date, !init_hour) {
                throw new Error("Los campos nombre feha y hora de inicio son requeridos.")
            }

            const values = { name, init_date, end_date, init_hour, end_hour, place, status }

            const event = await this.model.create(values)

            return event;
        } catch (error) {
            return { message: "ERROR" }
        }
    }

    async findOne(id) {
        const event = await this.model.findByPk(id)
        return event
    }

    async update(id, values) {
        const event = await this.findOne(id)
        if (!event) return null
        const updateEvent = await event.update(values)
        return updateEvent
    }

    async delete(id, values) {
        const event = await this.model.findOne({
            where: {
                id,
                status: true
            }
        })
        if (!event) return null
        const updateEvent = await event.update(values)
        return updateEvent
    }

}

module.exports = EventService
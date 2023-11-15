const AreaService = require('../services/area.service')

class AreaController {
    constructor() {
        this.service = new AreaService
    }

    async index() {
        const areas = await this.service.getAll()

        return areas
    }

    async create(name, code, observations, status) {
        const area = await this.service.create(name, code, observations, status)

        return area
    }

    async findOne(id) {
        const area = await this.service.findOne(id)

        if (!area) {
            return { message: "area no encontrada", status: false }
        }

        return { area, status: true }
    }

    async update(id, values) {
        const area = await this.service.update(id, values)

        if (!area) throw new Error("El area no existe")

        return area
    }

    async delete(id, values) {
        const area = await this.service.delete(id, values)

        if (!area) {
            throw new Error("Area no encontrada")
        }

        let message = "El area quedo inactiva"

        return message
    }
}

module.exports = AreaController
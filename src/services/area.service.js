const { models } = require('../libs/sequelize')

class AreaService {
    constructor() {
        this.model = models.Areas
    }

    async getAll() {
        const areas = await this.model.findAll({
            where: { status: true }
        })
        return areas;
    }

    async create(name, code, observations, status) {
        const values = { name, code, observations, status}
        const area = await this.model.create(values)

        return area;
    }

    async findOne(id) {
        const area = await this.model.findByPk(id)
        return area
    }

    async update(id, values) {
        const area = await this.findOne(id)
        if (!areas) return null
        const updateArea = await area.update(values)
        return updateArea
    }

    async delete(id, values) {
        const area = await this.model.findOne({
            where: {
                id: id,
                status: true
            }
        })
        if (!area) return null
        const updateArea = await area.update(values)
        return updateArea
    }

}

module.exports = AreaService
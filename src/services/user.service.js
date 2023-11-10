const { models } = require('../libs/sequelize')

class UserService {
    constructor() {
        this.model = models.User
    }

    async getAll() {
        const users = await this.model.findAll({
            include: ['areas'],
            attributes: {
                exclude: ['password']
            },
            where: { status: true }
        })
        return users;
    }

    async create(name, email, password, status, area_id, areas) {

        if (area_id && areas) {
            throw new Error("You cand provide area_id and area on same time")
        }
        const values = { name, email, password, status }

        if (area_id) values.area_id = area_id
        if (areas) values.areas = areas

        const user = await this.model.create(values, {
            include: [{
                association: 'areas'
            }]
        })

        return user;
    }

    async findOne(id) {
        const user = await this.model.findByPk(id, {
            include: ['areas']
        })
        return user
    }

    async update(id, values) {
        const user = await this.findOne(id)
        if (!user) return null
        const updateUser = await user.update(values)
        return updateUser
    }

    async delete(id, values) {
        const user = await this.model.findOne({
            where: {
                id: id,
                status: true
            }
        })
        if (!user) return null
        const updateUser = await user.update(values)
        return updateUser
    }

}

module.exports = UserService
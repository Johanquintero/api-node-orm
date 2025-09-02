const UserService = require('../services/user.service')

class UserController {
    constructor() {
        this.service = new UserService
    }

    async index() {
        const users = await this.service.getAll()

        return users
    }

    async create(name, email, password, status, area_id, area) {
        const user = await this.service.create(name, email, password, status, area_id, area)

        return user
    }

    async findOne(id) {
        try {
            const user = await this.service.findOne(id)

            if (!user) {
                return { message: "Usuario no encontrado", status: false }
            }
            delete user.dataValues.password

            return { user, status: true }
        } catch (error) {
            return { message: error.message, status: false }
        }
    }

    async findByEmail(email) {
        try {
            const user = await this.service.findByEmail(email)
            return user
        } catch (error) {
            return null
        }
    }

    async update(id, values) {
        const user = await this.service.update(id, values)

        if (!user) throw new Error("Usuario no existe")

        return user
    }

    async delete(id, values) {
        const user = await this.service.delete(id, values)

        if (!user) {
            throw new Error("Usuario no encontrado")
        }

        let message = "El usuario quedo inactivo"

        return message
    }
}

module.exports = UserController
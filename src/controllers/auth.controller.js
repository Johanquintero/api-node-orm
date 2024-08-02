const UserService = require('../services/user.service')

class AuthController {
    constructor() {
        this.service = new UserService
    }

    async login(username,password) {
        const users = await this.service.getAll()

        return users
    }

    async logout(name, email, password, status, area_id, area) {
        const user = await this.service.create(name, email, password, status, area_id, area)

        return user
    }
}

module.exports = AuthController
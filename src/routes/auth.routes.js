const { Router } = require('express')
const AreaController = require('../controllers/area.controller')
const UserController = require('../controllers/user.controller')

const router = Router()

const controller = new UserController()

const areaController = new AreaController()

router.post('/login', async (req, res) => {
    const users = await controller.index()

    res.json({ users })
})

router.post('/logout', async (req, res) => {
    const { name, email, password, status, area_id, areas } = req.body

    if (area_id || areas) {
        let issetArea = await areaController.findOne(area_id ?? areas.id)
        if (!issetArea.status) {
            res.status(404).json({ message:"El area seleccionada no existe!" })
        }
    }

    const user = await controller.create(name, email, password, status, area_id, areas)

    res.status(201).json({ user })
})

module.exports = router
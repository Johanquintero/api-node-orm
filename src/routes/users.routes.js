const { Router } = require('express')
const AreaController = require('../controllers/area.controller')
const UserController = require('../controllers/user.controller')

const router = Router()

const controller = new UserController()

const areaController = new AreaController()

router.get('/', async (req, res) => {
    const users = await controller.index()

    res.json({ users })
})

router.post('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await controller.findOne(id)
        res.status(200).json({ user })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name = "", email = "", status = "", password = "", area_id = ""  } = req.body
    const values = {}
    if (name) values.name = name;
    if (email) values.email = email;
    if (status) values.status = status;
    if (password) values.password = password;
    if (area_id) values.area_id = area_id;

    try {
        const user = await controller.update(id, values)
        res.status(200).json({ user })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const message = await controller.delete(id, { status: false })
        res.status(200).json({ message })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})




module.exports = router
const { Router } = require('express')
const AreaController = require('../controllers/area.controller')

const router = Router()

const controller = new AreaController()

router.get('/', async (req, res) => {
    const areas = await controller.index()

    res.json({ areas })
})

router.post('/', async (req, res) => {
    const { name, code, observations, status } = req.body

    const area = await controller.create(name, code, observations, status)

    res.status(201).json({ area })
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const area = await controller.findOne(id)
        res.status(200).json({ area })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name = "", code = "",observations = "", status = ""  } = req.body
    const values = {}
    if (name) values.name = name
    if (code) values.code = code
    if (observations) values.observations = observations
    if (status) values.status = status

    try {
        const area = await controller.update(id, values)
        res.status(200).json({ area })
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
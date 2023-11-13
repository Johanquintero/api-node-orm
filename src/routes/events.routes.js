const { Router } = require('express')
const EventController = require('../controllers/event.controller')

const router = Router()

const controller = new EventController()

router.get('/', async (req, res) => {
    const events = await controller.index()

    res.json({ events })
})

router.post('/', async (req, res) => {
    const { name, init_date, end_date, init_hour, end_hour, place, status } = req.body

    console.log( name, init_date, end_date, init_hour, end_hour, place, status)

    const event = await controller.create(name, init_date, end_date, init_hour, end_hour, place, status)

    res.status(201).json({ event })
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const event = await controller.findOne(id)
        res.status(200).json({ event })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name = "", init_date = "", end_date = "", init_hour = "", end_hour = "", place = "",status ="" } = req.body
    const values = {}
    if (name) values.name = name;
    if (init_date) values.init_date = init_date;
    if (end_date) values.end_date = end_date;
    if (init_hour) values.init_hour = init_hour;
    if (end_hour) values.end_hour = end_hour;
    if (place) values.place = place;
    if (status) values.status = status;

    try {
        const event = await controller.update(id, values)
        res.status(200).json({ event })
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
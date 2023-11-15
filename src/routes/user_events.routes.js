const { Router } = require('express')
const UserEventController = require('../controllers/user_events.controller')
const UserController = require('../controllers/user.controller')
const EventController = require('../controllers/event.controller')

const router = Router()

const controller = new UserEventController()
const userController = new UserController()
const eventController = new EventController()

router.get('/', async (req, res) => {
    const userEvents = await controller.index()

    res.json({ userEvents })
})

router.post('/', async (req, res) => {
    try {
        const { status, event_id, event, user_id, user } = req.body

        if (!user_id) {
            throw new Error("El usuario es requerido")
        }
        if (!event_id) {
            throw new Error("El evento es requerido")
        }

        if (user_id) {
            let { message, status } = await userController.findOne(user_id)
            if (!status) throw new Error(message)
        }

        if (event_id) {
            let { message, status } = await eventController.findOne(event_id)
            if (!status) throw new Error(message)
        }
        const userEvent = await controller.create(status, event_id, event, user_id, user)

        res.status(201).json({ userEvent })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const userEvent = await controller.findOne(id)
        res.status(200).json({ userEvent })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { status = "", event_id = "", user_id = "" } = req.body
    const values = {}
    if (status) values.status = status;
    if (event_id) values.event_id = event_id;
    if (user_id) values.user_id = user_id;

    try {
        const userEvent = await controller.update(id, values)
        res.status(200).json({ userEvent })
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
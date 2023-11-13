const { Router } = require('express')
const UserEventController = require('../controllers/user_event.controller')

const router = Router()

const controller = new UserEventController()

router.get('/', async (req, res) => {
    const users = await controller.index()

    res.json({ users })
})

router.post('/', async (req, res) => {
    const { status, event_id, event, user_id, user } = req.body
    const userEvent = await controller.create(status, event_id, event, user_id, user)

    res.status(201).json({ userEvent })
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
    const { status = "", event_id = "", user_id = ""  } = req.body
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
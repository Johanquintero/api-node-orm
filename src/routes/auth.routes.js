const { Router } = require('express')
const AreaController = require('../controllers/area.controller')
const UserController = require('../controllers/user.controller')

const router = Router()

const controller = new UserController()

const areaController = new AreaController()

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    // Buscar usuario por email
    const user = await controller.findByEmail(email)
    if (!user) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' })
    }

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' })
    }

    // Aquí podrías generar un token JWT si lo necesitas

    res.json({ user })
})

router.post('/logout', async (req, res) => {
    // const { name, email, password, status, area_id, areas } = req.body

    // if (area_id || areas) {
    //     let issetArea = await areaController.findOne(area_id ?? areas.id)
    //     if (!issetArea.status) {
    //         res.status(404).json({ message:"El area seleccionada no existe!" })
    //     }
    // }

    // const user = await controller.create(name, email, password, status, area_id, areas)

    // res.status(201).json({ user })
})


router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, status = true, area_id, areas } = req.body

        // Validar que no exista el usuario
        const existingUser = await controller.findByEmail(email)
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' })
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        // Crear usuario
        const user = await controller.create(name, email, hashedPassword, status, area_id, areas)

        // Opcional: eliminar la contraseña del objeto de respuesta
        if (user && user.dataValues) {
            delete user.dataValues.password
        }

        res.status(201).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
const {Router} = require('express')
const userRouter = require('./users.routes')
const eventRouter = require('./events.routes')
const userEventsRouter = require('./user_events.routes')
const areasRouter = require('./areas.routes')

function routerApi(app){
    const router = Router()

    app.use('/api/v1',router)
    router.use('/users',userRouter)
    router.use('/events',eventRouter)
    router.use('/user-events',userEventsRouter)
    router.use('/areas',areasRouter)
}

module.exports = routerApi
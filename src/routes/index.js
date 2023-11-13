const {Router} = require('express')
const userRouter = require('./users.routes')
const eventRouter = require('./events.routes')
const userEventsRouter = require('./users_events.routes')

function routerApi(app){
    const router = Router()

    app.use('/api/v1',router)
    router.use('/users',userRouter)
    router.use('/events',eventRouter)
    router.use('/user-events',userEventsRouter)
}

module.exports = routerApi
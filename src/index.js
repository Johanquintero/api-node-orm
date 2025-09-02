const express = require('express')
const { port: APP_PORT } = require('./config/config')
const routerApi = require('./routes')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())
routerApi(app)
app.listen(APP_PORT, () => {
    console.log(`Running on PORT ${APP_PORT}`)
})


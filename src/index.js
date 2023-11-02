const express = require('express')
const { port: APP_PORT } = require('./config/config')

const app = express()
app.listen(APP_PORT, () => {
    console.log(`Running on PORT ${APP_PORT}`)
})


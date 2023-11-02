require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.APP_PORT,
    db_connection: process.env.CONNECTION,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_user: process.env.DB_USER,
    db_name: process.env.DB_NAME,
    db_password: process.env.DB_PASSWORD,
}

module.exports = config
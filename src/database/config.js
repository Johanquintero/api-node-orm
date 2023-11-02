const { db_user, db_password, db_connection, db_host, db_port, db_name } = require('../config/config')

const USER = encodeURIComponent(db_user)
const PASSWORD = encodeURI(db_password)

const URI = `${db_connection}://${USER}:${PASSWORD}@${db_host}:${db_port}/${db_name}`


module.exports = {
    development: {
        url: URI,
        dialect: db_connection
    },
    production: {
        url: URI,
        dialect: db_connection

    }
}
require('dotenv').config()

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,

    pool:{
        max: 10,
        min: 2,
        idleTimeoutMillis: 30000,
    },
    options:{
        encrypt: true,
        trustServerCertificate: true,
    }
}

module.exports = config;
import pg from 'pg'
import 'dotenv/config'

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env

export const pool = new pg.Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
    allowExitOnIdle: true,
    max: 10, 
    idleTimeoutMillis: 30000
})

pool.query("SELECT NOW()", (err, res) => {
    if(err){
        console.log('Error conectando la base de datos:', err)
    }
    else {
        console.log('Base de datos conectada', res.rows[0].now)
    }
})


import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import routerUsers from './src/routes/routes_users.js'
import errorHandler from './src/middlewares/errorHandler.js'


const app = express()


//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}))

/* 
//Ruta de prueba
app.get('/test', (req, res) => {
    res.json({message: 'ruta de prueba habilitada'})
})
 */

// Rutas
app.use('/', routerUsers)


//Middleware manejo de errores
app.use(errorHandler)


//Puerto de escucha
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server run on http://localhost:${PORT}`)
})
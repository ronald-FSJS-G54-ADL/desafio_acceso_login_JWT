import "dotenv/config"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { userModel } from "../models/model_users.js"

// Registro
const register = async (req, res, next) => {
    const {email, password, rol, lenguage} = req.body
    try {
        const existingUser = await userModel.findOneEmail(email)
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" })
        }
        await userModel.create({
            email,
            password: bcryptjs.hashSync(password, 10),
            rol,
            lenguage
        })
        return res.status(201).json({ message: `User created successfully with email: ${email} `})
    } catch (error) {
        console.log(error)
        next(error) 
    }
}

// Inicio de sesión
const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOneEmail(email)
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const isMatch = bcryptjs.compareSync(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // creación del payload
        const payload = {
            email,
            user_id: user.id,
            rol: user.rol,
            lenguage: user.lenguage
        }

        // creación del token con tiempo de expiración
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1m'})

        return res.status(200).json({ message: "User logged successfully", token })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// Obtener datos del usuario autenticado
const getUser = async (req, res, next) => {
    const { email } = req.user
    try {
        const user = await userModel.findOneEmail(email)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.status(200).json({ user })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const userController = {
    login,
    register,
    getUser
}

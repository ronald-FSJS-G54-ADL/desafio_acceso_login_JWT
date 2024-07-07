import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// Validaciones
export const userValidationRules = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

export const registerValidationRules = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('rol').notEmpty().withMessage('Role is required'),
    body('lenguage').notEmpty().withMessage('Lenguage is required')
]

// Middleware de validación
export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

// Middleware de autenticación
export const autenticatedToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: "No token provided" })
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({ error: "Invalid token" })
    }
}
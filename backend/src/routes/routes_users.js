import { Router } from 'express'
import { userController } from '../controllers/controller_users.js'
import { userValidationRules, registerValidationRules, validate, autenticatedToken } from '../middlewares/validations.js'

const router = Router()

// Rutas de usuario
router.post("/login", userValidationRules, validate, userController.login)
router.post("/usuarios", registerValidationRules, validate, userController.register)

// Ruta GET/usuarios que obtiene datos del usuario autenticado
router.get('/usuarios', autenticatedToken, userController.getUser)

export default router
import express from 'express'
const router = express.Router()
import * as authController from '../controllers/authControllers.js'

router.post('/Register',authController.Register)

router.route('/login')
            .post(authController.login)

export default router
//modules or packages
import express from 'express'

//importing middlewares
import {
	refreshAuth,
	accessAuth,
} from '../middlewares/auth'

//importing controllers
import {
	registerController,
	loginController,
	logoutController,
	refreshTokenController,
	tokenController,
	apiKeyGeneratorController
} from '../controllers/auth'

const authRoutes = express.Router()

//routes declaration
authRoutes.route('/login').post(loginController)
authRoutes.route('/logout').delete(refreshAuth, logoutController)
authRoutes.route('/register').post(registerController)
authRoutes.route('/token').get(accessAuth, tokenController)
authRoutes.route('/refresh-token').get(refreshAuth, refreshTokenController)
authRoutes.route('/generate-key').get(accessAuth, apiKeyGeneratorController)

export default authRoutes



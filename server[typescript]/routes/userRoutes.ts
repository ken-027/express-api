//modules or packages
import { express, multer } from '@modules'
import { requestLimit } from '@config/rateLimit'
import { PRODUCTION } from '@config'
//importing middlewares
import { apiAuth } from '@middlewares/auth'

//importing controllers
import {
	addUserInfoController,
	userInfoController,
	userListController,
	addSocialsController,
} from '@controllers/user'

const userRoutes = express.Router()
const upload = multer({
	dest: `./${
		PRODUCTION ? 'server[express]' : 'server[typescript]'
	}/storage/tmp`,
})

//routes declaration
userRoutes
	.route('/')
	.get(apiAuth, requestLimit, userListController)
	.post(
		apiAuth,
		requestLimit,
		upload.fields([
			{ name: 'logo', maxCount: 1 },
			{ name: 'profileImage', maxCount: 1 },
		]),
		addUserInfoController,
	)
userRoutes.route('/info').get(apiAuth, userInfoController)
userRoutes.route('/socials').post(apiAuth, upload.array('icon'), addSocialsController)

export default userRoutes

//modules or packages
import express from 'express'
import { requestLimit } from '../config/rateLimit'
import multer from 'multer'
import { PRODUCTION } from '../config'
//importing middlewares
import { apiAuth } from '../middlewares/auth'

//importing controllers
import {
  addUserInfoController,
  userInfoController,
  userListController
} from '../controllers/user'

const userRoutes = express.Router()
const upload = multer({
  dest: `./${PRODUCTION ? `server[express]` : `server[typescript]`}/storage/tmp`,
})

//routes declaration
userRoutes.route('/').get(apiAuth, requestLimit, userListController).post(apiAuth, requestLimit, upload.single('icon'), addUserInfoController)
userRoutes.route('/info').get(apiAuth, userInfoController)

export default userRoutes
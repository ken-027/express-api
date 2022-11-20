import express from 'express'

const skillRoutes = express.Router()

import { apiAuth } from '../middlewares/auth'

import {
  addSkillController,
  userSkills,
  editSkillController
} from '../controllers/skill'

skillRoutes.route('/').get(apiAuth, userSkills).post(apiAuth, addSkillController)
skillRoutes.route('/:id').put(apiAuth, editSkillController)

export default skillRoutes
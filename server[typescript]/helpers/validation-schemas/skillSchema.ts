import { joi } from '@modules'

const skill = {
  groupName: joi.string(),
  name: joi.string().required(),
  description: joi.string().required(),
  rating: joi.string().required(),
}

export const addSkillSchema = joi.object(skill)

export const editSkillSchema = joi.object({
  groupName: joi.string(),
  name: joi.string(),
  description: joi.string(),
  rating: joi.string(),
  id: joi.string().alphanum()
})
import { joi } from '@modules'

export const userInfoSchema = joi.object({
	firstName: joi.string().required(),
	lastName: joi.string().required(),
	intros: joi.object({
		header: joi.array().items(joi.string()).required(),
		aboutMe: joi.array().items(joi.string()).required(),
		skill: joi.array().items(joi.string()).required(),
		education: joi.array().items(joi.string()).required(),
		experience: joi.array().items(joi.string()).required(),
		work: joi.array().items(joi.string()).required()
	}).required(),
	// contacts: joi.array().items(joi.object()).required(),
	// socials: joi.array().items(joi.object()).required(),
})
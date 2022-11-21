import { joi } from '@modules'

const user = {
	email: joi.string().email({
		minDomainSegments: 2, tlds: {
			allow: ['com', 'net']
		}
	}).message('emails must be in .com or .net')
		.required(),
	password: joi.string()
		.pattern(/^[a-z\d]+$/i).message('password must be in alphanumeric with uppercase')
		.min(3).max(15)
		.required()
}

export const loginSchema = joi.object(user)

export const registerSchema = joi.object({
	lastName: joi.string().required(),
	firstName: joi.string().required(),
	username: joi.string().required(),
	...user,
})
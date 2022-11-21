import { Request, Response, asyncHandler } from '@modules'
import { User, Token } from '@models'
import {
	compare,
	generateToken,
	hash,
	loginSchema,
	validateOptions,
} from '@helpers'

const loginController = asyncHandler(async (req: Request, res: Response) => {
	const { error, value } = loginSchema.validate(req.body, validateOptions)

	if (error) {
		res.status(400).send({
			errors: error.details.map((err: { message: string }) => err.message),
		})
		return
	}

	const { email, password } = value

	const user = await User.findOne({ email })

	if (user && (await compare(password, user.password.toString()))) {
		const { accessToken, refreshToken } = generateToken(user.id)

		await Token.findOneAndUpdate(
			{ user: user.id },
			{
				$set: {
					accessToken: hash(accessToken),
					refreshToken: hash(refreshToken),
				},
			},
		)

		res.status(200).json({
			_id: user.id,
			// name: `${user.firstName} ${user.lastName}`,
			username: user.username,
			email: user.email,
			accessToken: accessToken,
			refreshToken: refreshToken,
		})
	} else {
		res.status(400)
		throw new Error('Invalid credential!')
	}
})

export default loginController

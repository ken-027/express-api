import { Request, Response, asyncHandler, bcryptjs } from '@modules'
import { User, UserInfo, Token } from '@models'
import {
	registerSchema,
	validateOptions,
	md5,
	generateToken,
	hash,
} from '@helpers'

const registerController = asyncHandler(async (req: Request, res: Response) => {
	const { error, value } = registerSchema.validate(req.body, validateOptions)

	if (error) {
		res.status(400).json({
			errors: error.details.map((err: { message: string }) => err.message),
		})
		return
	}

	const { lastName, firstName, email, password, username } = value

	const userExist = await User.findOne({
		$or: [{ username: username }, { email: email }],
	})

	if (userExist) {
		res.status(400)
		throw new Error(`Email or Username ${email} already exists!`)
	}

	const salt = await bcryptjs.genSalt(10)
	const hashedPassword = await bcryptjs.hash(password, salt)
	const apiKey = md5(`${email}.${password}`)

	const user = await User.create({
		firstName: firstName,
		lastName: lastName,
		email: email,
		username: username,
		password: hashedPassword,
		type: 'user',
	})

	if (user) {
		const { accessToken, refreshToken } = generateToken(user.id)

		await Token.create({
			accessToken: await hash(accessToken),
			refreshToken: await hash(refreshToken),
			apiKey: await hash(apiKey),
			user: user.id,
		})

		const userinfo = await UserInfo.create({
			user: user.id,
			firstName: firstName,
			lastName: lastName,
		})

		res.status(201).json({
			id: user.id,
			firstName: userinfo.firstName,
			lastName: userinfo.lastName,
			email: user.email,
			accessToken: accessToken,
			refreshToken: refreshToken,
			apiKey: apiKey,
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data!')
	}
})

export default registerController

import { Request, Response, NextFunction, jwt, asyncHandler } from '@modules'

import { Token, User } from '@models'
import { JWT_REFRESH_SECRET } from '@config'
import { hash } from '@helpers'

const authRefresh = asyncHandler(
	async (
		req: Request & { user?: unknown },
		res: Response,
		next: NextFunction,
	) => {
		const authorization = req.headers.authorization

		if (!(authorization && authorization.startsWith('Bearer'))) {
			res.status(400)
			throw new Error('Header authorization refresh bearer token is required')
		}

		const token = authorization.split(' ')[1]

		jwt.verify(token, JWT_REFRESH_SECRET)

		const getToken = await Token.findOne({ refreshToken: hash(token) })

		if (!getToken) {
			res.status(401)
			throw new Error('Not authorized, Invalid refresh token!')
		}

		req.user = await User.findById(getToken.user).select('-password')

		next()
	},
)

export default authRefresh

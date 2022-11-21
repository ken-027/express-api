import { Request, Response, NextFunction, asyncHandler } from '@modules'

import { Token, User } from '@models'
import { hash } from '@helpers'

const apiAuth = asyncHandler(
	async (
		req: Request & { apikey?: string; user?: unknown },
		res: Response,
		next: NextFunction,
	) => {
		if (!req.query.apikey) {
			res.status(400)
			throw new Error('param apikey is missing')
		}

		const { apikey } = req.query

		const hashed = hash(apikey.toString())

		const getToken = await Token.findOne({ apiKey: hashed })

		if (!getToken) {
			res.status(401)
			throw new Error('not valid apikey')
		}

		req.user = await User.findById(getToken?.user)
		next()
	},
)

export default apiAuth

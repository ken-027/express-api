import { Request, Response, asyncHandler } from '@modules'
import { Token } from '@models'

const logoutController = asyncHandler(
	async (req: Request & { user?: object }, res: Response) => {
		const { id } = req?.user as { id: string }

		const getToken = await Token.findOne({ user: id })

		if (!getToken?.refreshToken) {
			res.status(401).json({
				message: 'User not been logged in',
			})
			return
		}

		await getToken.update({
			$set: {
				accessToken: '',
				refreshToken: '',
			},
		})

		res.sendStatus(204)
	},
)

export default logoutController

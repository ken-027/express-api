import { Request, Response, asyncHandler } from '@modules'
import { Token } from '@models'
import { hash, generateToken } from '@helpers'

const tokenController = asyncHandler(
	async (req: Request & { user?: object }, res: Response) => {
		const { id } = req?.user as { id: string }

		const { accessToken, refreshToken } = generateToken(id)

		await Token.findOneAndUpdate(
			{ user: id },
			{
				$set: {
					accessToken: hash(accessToken),
					refreshToken: hash(refreshToken),
				},
			},
		)

		res.status(200).send({
			accessToken: accessToken,
			refreshToken: refreshToken,
		})
	},
)

export default tokenController

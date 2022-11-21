import { Request, Response, asyncHandler } from '@modules'
import { UserInfo } from '@models'

const addUserInfoController = asyncHandler(
	async (req: Request & { user?: object }, res: Response) => {
		const { id } = req?.user as { id: string }
		const userinfo = await UserInfo.findOne({
			user: id,
		})
			.populate({
				path: 'user',
				select: '-createdAt -updatedAt -__v',
			})
			.select('-createdAt -updatedAt -__v')

		res.status(201).json(userinfo)
	},
)

export default addUserInfoController

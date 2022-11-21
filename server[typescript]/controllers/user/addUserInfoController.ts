import { Request, Response, asyncHandler } from '@modules'
import { UserInfo } from '@models'
import { isImage, userInfoSchema, validateOptions, fileUpload } from '@helpers'

const addUserInfoController = asyncHandler(
	async (
		req: Request & { user?: object; file?: { icon?: object } },
		res: Response,
	) => {
		const { error, value } = userInfoSchema.validate(req.body, validateOptions)

		if (error) {
			res.status(400).json({
				errors: error.details.map((err: { message: string }) => err.message),
			})
			return
		}

		const { intros, firstName, lastName } = value
		const icon = req.file?.icon as object
		const image = isImage(icon)

		if (!icon || !image) {
			res.status(400).json({
				errors: [!image ? 'icon must be jpg or png' : 'icon is required'],
			})
			return
		}

		const { id } = req?.user as { id: string }
		const uploadFile = fileUpload({
			file: icon,
			name: `${id}/userinfo`,
		})

		console.log(id)
		const userinfo = await UserInfo.findOneAndUpdate(
			{ user: id },
			{
				intro: intros,
				firstName: firstName,
				lastName: lastName,
			},
		).select('id intro aboutMe socials')

		console.log(userinfo)
		uploadFile.saveFile()
		if (userinfo) {
			res.status(201).json(userinfo)
		} else {
			res.status(400)
			throw new Error('Invalid user data!')
		}
	},
)

export default addUserInfoController

import { Request, Response, asyncHandler } from '@modules'
import { UserInfo } from '@models'
import {
	isImage,
	userSocialSchema,
	validateOptions,
	fileUpload,
} from '@helpers'
import { TFile } from '@types'

const addSocialsController = asyncHandler(
	async (req: Request & { user?: unknown; file?: unknown }, res: Response) => {
		const { error, value } = userSocialSchema.validate(
			req.body,
			validateOptions,
		)

		if (error) {
			res.status(400).json({
				errors: error.details.map((err: { message: string }) => err.message),
			})
			return
		}

		const { id } = req.user as { id: string }
		const { name, link } = value
		const icons = req.files as unknown as TFile[]
		const isIcon = isImage(icons[0])

		if (!icons[0] || !isIcon) {
			res.status(400).json({
				errors: [!isIcon ? 'icon must be jpg or png' : 'icon is required'],
			})
			return
		}

		const uploadIcon = fileUpload({
			file: icons[0],
			name: `${id}/userinfo/socials`,
		})

		const socials = name.map((val: string, index: number) => ({
			name: val,
			link: link[index],
			icon: uploadIcon.filePath,
		}))

		const userinfo = await UserInfo.findOneAndUpdate(
			{ user: id },
			{ $push: { socials: socials } },
		)

		uploadIcon.saveFile()
		if (userinfo) {
			res.status(201).json(userinfo)
		} else {
			res.status(400)
			throw new Error('Invalid user data!')
		}
	},
)

export default addSocialsController

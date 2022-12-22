import { Request, Response, asyncHandler } from '@modules'
import { UserInfo } from '@models'
import { isImage, userInfoSchema, validateOptions, fileUpload } from '@helpers'
import { TFile } from '@types'

const addUserInfoController = asyncHandler(
	async (req: Request & { user?: unknown; files?: unknown }, res: Response) => {
		const { error, value } = userInfoSchema.validate(req.body, validateOptions)

		if (error) {
			res.status(400).json({
				errors: error.details.map((err: { message: string }) => err.message),
			})
			return
		}

		const { intros } = value
		const { logo, profileImage } = req.files as unknown as {
			logo: TFile[]
			profileImage: TFile[]
		}
		const isLogo = isImage(logo[0])
		const isProfileImage = isImage(profileImage[0])

		if (!logo || !isLogo) {
			res.status(400).json({
				errors: [!isLogo ? 'logo must be jpg or png' : 'logo is required'],
			})
			return
		}

		if (!profileImage || !isProfileImage) {
			res.status(400).json({
				errors: [
					!isProfileImage
						? 'profileImage must be jpg or png'
						: 'profileImage is required',
				],
			})
			return
		}

		const { id } = req?.user as { id: string }
		const uploadLogo = fileUpload({
			file: logo[0],
			name: `${id}/userinfo`,
		})
		const uploadProfile = fileUpload({
			file: profileImage[0],
			name: `${id}/userinfo`,
		})

		const userinfo = await UserInfo.findOneAndUpdate(
			{ user: id },
			{
				intros: intros,
				logo: uploadLogo.filePath,
				profileImage: uploadProfile.filePath,
			},
		).select('id firstName lastName intros aboutMe logo profileImage socials')

		uploadLogo.saveFile()
		uploadProfile.saveFile()
		if (userinfo) {
			res.status(201).json(userinfo)
		} else {
			res.status(400)
			throw new Error('Invalid user data!')
		}
	},
)

export default addUserInfoController

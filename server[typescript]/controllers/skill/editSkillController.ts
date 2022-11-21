import { Request, Response, asyncHandler } from '@modules'
import { Skill } from '@models'
import { editSkillSchema, validateOptions, isImage, fileUpload } from '@helpers'

const editSkillController = asyncHandler(
	async (req: Request & { user?: object }, res: Response) => {
		const { error, value } = editSkillSchema.validate(
			{ ...req.body, ...req.params },
			validateOptions,
		)

		if (error) {
			res.status(400).json({
				errors: error.details.map((err: { message: string }) => err.message),
			})
			return
		}

		const { name, description, rating } = value

		const icon = req.files?.icon
		const image = icon && isImage(icon)

		if (!icon || !image) {
			res.status(400).json({
				errors: [!icon ? 'icon is required' : 'icon accepts png, jpeg and jpg'],
			})
			return
		}

		const { id } = req.user as { id: string }

		const uploadedFile = fileUpload({ file: image, name: `${id}/skills` })

		const skill = await Skill.create({
			name: name,
			description: description,
			rating: rating,
			logo: uploadedFile.filePath,
			user: id,
		})

		if (skill) {
			await uploadedFile.saveFile()
			res.status(201).json(skill)
		}
	},
)

export default editSkillController

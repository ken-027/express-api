import { Request, Response, asyncHandler } from '@modules'
import {
  addSkillSchema,
  validateOptions,
  isImage,
  fileUpload
} from '@helpers'

import { Skill } from '@models'

const addSkillController = asyncHandler(async (req: Request & { user?: any }, res: Response) => {
  const { error, value } = addSkillSchema.validate(req.body, validateOptions)

  if (error) {
    res.status(400).json({
      errors: error.details.map((err: Error | any) => err.message)
    })
    return
  }

  const { name, description, rating, groupName } = value

  const logo = req.files?.logo
  const image = isImage(logo)
  console.log(logo)
  if (!image) {
    res.status(400).json({
      errors: ['logo accepts png and jpg']
    })
    return
  }

  const { id } = req.user

  const uploadedFile = fileUpload({ file: image, name: `${id}/skills` })

  const skill = await Skill.create({
    groupName: groupName,
    name: name,
    description: description,
    rating: rating,
    logo: uploadedFile.filePath,
    user: id
  })


  if (skill) {
    await uploadedFile.saveFile()
    res.status(201).json(skill)
  }
})

export default addSkillController
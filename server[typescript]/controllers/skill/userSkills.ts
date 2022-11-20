import { Request, Response, asyncHandler } from '@modules'
import { Skill } from '@models'
import { ISkills } from '@types'

const userSkills = asyncHandler(async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.user
  const domain = `${req.protocol}://${req.headers.host}`
  const skills = await Skill.find({ user: id })

  res.status(200).json(skills.map((skill: ISkills | any) => ({
    ...skill.toObject(),
    logo: `${domain}/images${skill.icon}`
  })
  ))
})

export default userSkills

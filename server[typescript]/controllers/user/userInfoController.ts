import { Request, Response, asyncHandler } from '@modules'
import { UserInfo } from '@models'

const addUserInfoController = asyncHandler(async (req: Request & { user?: any }, res: Response) => {
  const userinfo = await UserInfo.findOne({ user: req.user.id })
    .populate({
      path: 'user',
      select: '-createdAt -updatedAt -__v'
    }).select('-createdAt -updatedAt -__v')

  res.status(201).json(userinfo)
})

export default addUserInfoController
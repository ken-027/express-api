import { Request, Response, asyncHandler } from '@modules'
import { User } from '@models'

const userListController = asyncHandler(async (req: Request & { user?: any }, res: Response) => {
  const user = await User.find({})
    .select('id username email type status')

  res.status(200).json(user)
})

export default userListController
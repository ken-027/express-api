import {
  Request,
  Response,
  NextFunction,
  jwt,
  asyncHandler,
} from '@modules'

import { Token, User } from '@models'
import { JWT_SECRET } from '@config'
import { hash } from '@helpers'

const accessAuth = asyncHandler(async (req: Request | any, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization

  if (!(authorization && authorization.startsWith('Bearer'))) {
    res.status(400)
    throw new Error('Header authorization bearer access token is required')
  }

  const token = authorization.split(' ')[1]

  jwt.verify(token, JWT_SECRET)


  const getToken = await Token.findOne({ accessToken: hash(token) })

  if (!getToken) {
    res.status(401)
    throw new Error('Not authorized, Invalid access token!')
  }

  req.user = await User.findById(getToken.user).select('-password')

  next()
})

export default accessAuth




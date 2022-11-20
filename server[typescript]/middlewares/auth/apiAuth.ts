import {
  Request,
  Response,
  NextFunction,
  asyncHandler,
} from '@modules'

import { Token, User } from '@models'
import { hash } from '@helpers'



const apiAuth = asyncHandler(async (req: Request & { apikey?: string, user?: any }, res: Response, next: NextFunction) => {
  if (!req.query.apikey) {
    res.status(400)
    throw new Error('param apikey is missing')
  }

  const { apikey } = req.query

  const hashed = hash(apikey.toString())

  const getToken = await Token.findOne({ apiKey: hashed })

  if (!getToken) {
    res.status(401)
    throw new Error('not valid apikey')
  }

  const user = await User.findById(getToken?.user)

  req.user = user
  next()
})

export default apiAuth

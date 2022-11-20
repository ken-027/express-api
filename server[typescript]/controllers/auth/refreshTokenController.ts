import  { Request, Response, asyncHandler } from '@modules'
import { generateToken, hash } from '@helpers'
import { Token} from '@models'

const refreshTokenController = asyncHandler(async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.user

  const { accessToken, refreshToken } = generateToken(id)

  await Token.findOneAndUpdate({ user: id }, {
    $set: {
      accessToken: hash(accessToken), refreshToken: hash(refreshToken)
    }
  })

  res.status(200).send({
    accessToken: accessToken,
    refreshToken: refreshToken
  })
})

export default refreshTokenController
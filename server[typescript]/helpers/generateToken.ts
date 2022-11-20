import { jwt } from '@modules'
import { JWT_REFRESH_SECRET, JWT_SECRET } from '@config'

export const generateToken = (id: string | number) => {
  return {
    accessToken: jwt.sign({ id }, JWT_SECRET, {
      expiresIn: '30m', //2h
    }),
    refreshToken: jwt.sign({ id }, JWT_REFRESH_SECRET, {
      expiresIn: '15d', //15d
    })
  }
}

export default generateToken
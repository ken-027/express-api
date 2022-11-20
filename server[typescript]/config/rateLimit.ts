import {
  limiter
} from '@modules'

export const requestLimit = limiter({
  windowMs: 60000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false
})

import { CorsOptions } from '@modules'
import { PRODUCTION, WHITELIST } from '@config'

const corsOption: CorsOptions = {
  origin: (origin: any, callback: any) => {

    // TODO here!
    if (WHITELIST.indexOf(origin) === -1 && (!PRODUCTION && origin !== undefined)) return callback(new Error(`${origin} Not allowed by CORS`))

    callback(null, true)
  },
  optionsSuccessStatus: 200
}

export default corsOption
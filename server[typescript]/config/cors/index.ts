import { CorsOptions } from '@modules'
import { PRODUCTION, WHITELIST } from '@config'

const corsOption: CorsOptions = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	origin: (origin: unknown, callback: any) => {
		// TODO here!
		if (
			WHITELIST.indexOf(origin as string) === -1 &&
			!PRODUCTION &&
			origin !== undefined
		)
			return callback(new Error(`${origin} Not allowed by CORS`))

		callback(null, true)
	},
	optionsSuccessStatus: 200,
}

export default corsOption

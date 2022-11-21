import { Request, Response, NextFunction } from '@modules'

import { errorLogger } from '@helpers'
import { PRODUCTION } from '@config'

const errorHandler = (
	err: { message: string; stack: string },
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
) => {
	const statusCode =
		res.statusCode >= 400 && res.statusCode < 500 ? res.statusCode : 500

	//console log error
	// !isProduction &&
	// console.log(colors.red(`Stack: ${err.stack}`))

	res.status(statusCode).json({
		message: err.message,
		stack: PRODUCTION
			? errorLogger(err.stack) && 'see in the errors log'
			: err.stack,
	})
}

export default errorHandler

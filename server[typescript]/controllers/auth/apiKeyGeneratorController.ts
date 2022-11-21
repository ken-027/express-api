import { Request, Response, asyncHandler } from '@modules'
import { pbkdf2, hash, hashFile } from '@helpers'
import { Token } from '@models'
import { IUserModel } from '@types'

const apiKeyGeneratorController = asyncHandler(
	async (req: Request & { user?: object }, res: Response) => {
		const { email, password, id } = req.user as IUserModel & { id: string }

		const apikey = pbkdf2(`${email}.${password}`)

		console.log(hashFile(apikey))
		await Token.findOneAndUpdate(
			{ user: id },
			{
				$set: {
					apiKey: hash(apikey),
				},
			},
		)

		res.status(200).json({ message: apikey })
	},
)

export default apiKeyGeneratorController

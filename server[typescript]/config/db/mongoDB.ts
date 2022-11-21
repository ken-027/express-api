import { colors, mongoose } from '@modules'
import { MONGO_URI } from '@config'

const mongoDB = async () => {
	console.log(colors.yellow('Please wait while connecting to database...'))

	try {

		const conn = await mongoose.connect(MONGO_URI || '')
		console.log(colors.cyan.underline(`MongoDB Connected: ${conn.connection.host}`))
	} catch (err) {

		console.log(colors.red('Failed to connect to database'))
		console.log(err)
		process.exit(1)
	}
}

export default mongoDB

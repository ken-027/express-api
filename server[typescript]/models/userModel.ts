import { mongoose } from '@modules'
import { APP_KEY, APP_NAME } from '@config'
import { IUserModel } from '@types'

const userSchema: IUserModel = {
	username: {
		type: String,
		required: [true, 'please add username'],
		unique: true
	},
	email: {
		type: String,
		required: [true, 'please add email'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'please add password']
	},
	type: {
		type: String,
		enum: ['user', 'admin']
	},
	status: {
		type: Number,
		enum: [0, 1],
		default: 1
	},
}

const schema = new mongoose.Schema(userSchema, { timestamps: true })

export const collectionName = `${APP_NAME}.users.${APP_KEY.slice(0, 5)}`
export const Model = mongoose.model(collectionName, schema)
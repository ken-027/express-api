import { collectionName as userName } from './userModel'
import { mongoose } from '@modules'
import { APP_KEY, APP_NAME } from '@config'
import { IEducation } from '@types'



const eductaionSchema: IEducation = {
	courseName: {
		type: String,
		required: [true, 'please add courseName'],
	},
	year: {
		started: { type: Date },
		ended: { type: Date },
	},
	hasDegree: {
		type: Number,
		enum: [0, 1]
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: userName,
	},
}

const schema = new mongoose.Schema(eductaionSchema, { timestamps: true })

export const collectionName = `${APP_NAME}.educations.${APP_KEY.slice(0, 5)}`
export const Model = mongoose.model(collectionName, schema)

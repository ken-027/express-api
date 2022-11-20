import { collectionName as userName } from "./userModel"
import { mongoose } from '@modules'
import { APP_KEY, APP_NAME } from "@config"
import { IExperienceModel } from "@types"

const experienceSchema: IExperienceModel = {
  company: {
    type: String,
    required: [true, 'please add a company'],
  },
  position: {
    type: String,
    required: [true, 'please add a role'],
  },
  location: {
    type: String,
    required: [true, 'please add a location'],
  },
  environment: {
    type: String,
  },
  jobType: {
    type: String,
  },
  term: {
    dataStarted: {
      type: Date,
      required: [true, 'please add a dateStarted'],
    },
    dateEnded: {
      type: Date,
      required: [true, 'please add a dateEnded'],
    }
  },
  description: [
    {
      type: String,
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userName,
  },
}


const schema = new mongoose.Schema(experienceSchema, { timestamps: true })

export const collectionName = `${APP_NAME}.experiences.${APP_KEY.slice(0, 5)}`
export const Model = mongoose.model(collectionName, schema)

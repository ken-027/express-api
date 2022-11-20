import { mongoose } from '@modules'
import { APP_KEY, APP_NAME } from "@config"
import { IWork } from "@types"
import { collectionName as userName } from "./userModel"
import { collectionName as skillName } from "./skillModel"

const workSchema: IWork = {
  name: {
    type: String,
    required: [true, 'please add a name'],
  },
  description: {
    type: String,
    required: [true, 'please add a description'],
  },
  techUsed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: skillName
  }],
  images: [{
    type: String
  }],
  link: {
    type: String,
  },
  repository: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userName,
  },
}


const schema = new mongoose.Schema(workSchema, { timestamps: true })

export const collectionName = `${APP_NAME}.works.${APP_KEY.slice(0, 5)}`
export const Model = mongoose.model(collectionName, schema)

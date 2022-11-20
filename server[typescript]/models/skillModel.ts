import { collectionName as userName } from "./userModel"
import { mongoose } from '@modules'
import { APP_KEY, APP_NAME } from "@config"
import { ISkills } from "@types"


const skillSchema: ISkills = {
  groupName: {
    type: String,
    required: [true, 'please add a groupName'],
  },
  name: {
    type: String,
    required: [true, 'please add a name'],
  },
  description: {
    type: String,
    required: [true, 'please add a description'],
  },
  icon: {
    type: String,
  },
  rating: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userName,
  },
}

const schema = new mongoose.Schema(skillSchema, { timestamps: true })

export const collectionName = `${APP_NAME}.skills.${APP_KEY.slice(0, 5)}`
export const Model = mongoose.model(collectionName, schema)

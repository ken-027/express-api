import { collectionName as userName } from "./userModel"
import { mongoose } from '@modules'
import { APP_KEY, APP_NAME } from "@config"
import { ITokenModel } from "@types"

const tokenSchema: ITokenModel = {
  user: {
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: userName,
  },
  refreshToken: {
    type: String,
    required: [true, 'please add a refreshToken']
  },
  accessToken: {
    type: String,
  },
  apiKey: {
    type: String,
    required: [true, 'please add a apiKey']
  }
}


const schema = new mongoose.Schema(tokenSchema, { timestamps: true })

export const collectionName = `${APP_NAME}.tokens.${APP_KEY.slice(0, 5)}`
export const Model = mongoose.model(collectionName, schema)

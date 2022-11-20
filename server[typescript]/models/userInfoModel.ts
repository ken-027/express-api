import { mongoose } from '@modules'
import { APP_KEY, APP_NAME } from "@config"
import { IUserInfoModel } from "@types"
import { collectionName as userName } from "./userModel"

const userInfoModel: IUserInfoModel = {
  firstName: {
    type: String,
    required: [true, 'please add firstname']
  },
  lastName: {
    type: String,
    required: [true, 'please add lastname']
  },
  socials: [{
    name: { type: String },
    link: { type: String },
    icon: { type: String }
  }],
  contacts: [{
    name: { type: String },
    info: { type: String },
    icon: { type: String },
  }],
  intros: {
    header: [{ type: String }],
    aboutMe: [{ type: String }],
    skill: [{ type: String }],
    education: [{ type: String }],
    experience: [{ type: String }],
    work: [{ type: String }],
  },
  profileImage: { type: String },
  logo: { type: String },
  user: {
    type: mongoose.Types.ObjectId,
    ref: userName
  }
}

const schema = new mongoose.Schema(userInfoModel, { timestamps: true })

export const collectionName = `${APP_NAME}.userinfo.${APP_KEY.slice(0, 5)}`
export const Model = mongoose.model(collectionName, schema)
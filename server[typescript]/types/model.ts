import mongoose from "mongoose"

export interface ITokenModel {
  user: mongoose.SchemaDefinitionProperty
  refreshToken: mongoose.SchemaDefinitionProperty
  accessToken: mongoose.SchemaDefinitionProperty
  apiKey: mongoose.SchemaDefinitionProperty
}

export interface ISocials {
  name: mongoose.SchemaDefinitionProperty
  link: mongoose.SchemaDefinitionProperty
  icon: mongoose.SchemaDefinitionProperty
}

export interface IUserModel {
  username: mongoose.SchemaDefinitionProperty
  type: mongoose.SchemaDefinitionProperty
  email: mongoose.SchemaDefinitionProperty
  password: mongoose.SchemaDefinitionProperty
  status: mongoose.SchemaDefinitionProperty
}

export interface IContact {
  name: mongoose.SchemaDefinitionProperty
  info: mongoose.SchemaDefinitionProperty
  icon: mongoose.SchemaDefinitionProperty
}

export interface IUserInfoModel {
  firstName: mongoose.SchemaDefinitionProperty
  lastName: mongoose.SchemaDefinitionProperty
  socials: ISocials[]
  contacts: IContact[]
  user: mongoose.SchemaDefinitionProperty
  profileImage: mongoose.SchemaDefinitionProperty
  logo: mongoose.SchemaDefinitionProperty
  intros: {
    header: mongoose.SchemaDefinitionProperty[]
    aboutMe: mongoose.SchemaDefinitionProperty[]
    skill: mongoose.SchemaDefinitionProperty[]
    education: mongoose.SchemaDefinitionProperty[]
    experience: mongoose.SchemaDefinitionProperty[]
    work: mongoose.SchemaDefinitionProperty[]
  }
}

export interface IExperienceModel {
  company: mongoose.SchemaDefinitionProperty
  location: mongoose.SchemaDefinitionProperty
  environment: mongoose.SchemaDefinitionProperty
  jobType: mongoose.SchemaDefinitionProperty
  position: mongoose.SchemaDefinitionProperty
  term: {
    dataStarted: mongoose.SchemaDefinitionProperty
    dateEnded: mongoose.SchemaDefinitionProperty
  },
  description: mongoose.SchemaDefinitionProperty[]
  user: mongoose.SchemaDefinitionProperty
}

export interface ISkills {
  groupName: mongoose.SchemaDefinitionProperty
  name: mongoose.SchemaDefinitionProperty
  icon: mongoose.SchemaDefinitionProperty
  rating: mongoose.SchemaDefinitionProperty
  description: mongoose.SchemaDefinitionProperty
  user: mongoose.SchemaDefinitionProperty

}

export interface IWork {
  name: mongoose.SchemaDefinitionProperty
  description: mongoose.SchemaDefinitionProperty
  repository: mongoose.SchemaDefinitionProperty
  link: mongoose.SchemaDefinitionProperty
  images: mongoose.SchemaDefinitionProperty[]
  techUsed: mongoose.SchemaDefinitionProperty
  user: mongoose.SchemaDefinitionProperty
}

export interface IEducation {
  courseName: mongoose.SchemaDefinitionProperty
  year: {
    started: mongoose.SchemaDefinitionProperty
    ended: mongoose.SchemaDefinitionProperty
  },
  hasDegree: mongoose.SchemaDefinitionProperty
  user: mongoose.SchemaDefinitionProperty
}
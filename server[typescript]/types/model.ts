import mongoose, { Date } from 'mongoose'

export interface ITokenModel {
	user: mongoose.SchemaDefinitionProperty | string
	refreshToken: mongoose.SchemaDefinitionProperty | string
	accessToken: mongoose.SchemaDefinitionProperty | string
	apiKey: mongoose.SchemaDefinitionProperty | string
}

export interface ISocials {
	name: mongoose.SchemaDefinitionProperty | string
	link: mongoose.SchemaDefinitionProperty | string
	icon: mongoose.SchemaDefinitionProperty | string
}

export interface IUserModel {
	username: mongoose.SchemaDefinitionProperty | string
	type: mongoose.SchemaDefinitionProperty | string
	email: mongoose.SchemaDefinitionProperty | string
	password: mongoose.SchemaDefinitionProperty | string
	status: mongoose.SchemaDefinitionProperty | string
}

export interface IContact {
	name: mongoose.SchemaDefinitionProperty | string
	info: mongoose.SchemaDefinitionProperty | string
	icon: mongoose.SchemaDefinitionProperty | string
}

export interface IUserInfoModel {
	firstName: mongoose.SchemaDefinitionProperty | string
	lastName: mongoose.SchemaDefinitionProperty | string
	socials: ISocials[]
	contacts: IContact[]
	user: mongoose.SchemaDefinitionProperty | string
	profileImage: mongoose.SchemaDefinitionProperty | string
	logo: mongoose.SchemaDefinitionProperty | string
	intros: {
		header: mongoose.SchemaDefinitionProperty[] | string[]
		aboutMe: mongoose.SchemaDefinitionProperty[] | string[]
		skill: mongoose.SchemaDefinitionProperty[] | string[]
		education: mongoose.SchemaDefinitionProperty[] | string[]
		experience: mongoose.SchemaDefinitionProperty[] | string[]
		work: mongoose.SchemaDefinitionProperty[] | string[]
	}
}

export interface IExperienceModel {
	company: mongoose.SchemaDefinitionProperty | string
	location: mongoose.SchemaDefinitionProperty | string
	environment: mongoose.SchemaDefinitionProperty | string
	jobType: mongoose.SchemaDefinitionProperty | string
	position: mongoose.SchemaDefinitionProperty | string
	term: {
		dataStarted: mongoose.SchemaDefinitionProperty | string
		dateEnded: mongoose.SchemaDefinitionProperty | string
	}
	description: mongoose.SchemaDefinitionProperty[] | string[]
	user: mongoose.SchemaDefinitionProperty | string
}

export interface ISkills {
	groupName: mongoose.SchemaDefinitionProperty | string
	name: mongoose.SchemaDefinitionProperty | string
	icon: mongoose.SchemaDefinitionProperty | string
	rating: mongoose.SchemaDefinitionProperty | number
	description: mongoose.SchemaDefinitionProperty | string
	user: mongoose.SchemaDefinitionProperty | string
}

export interface IWork {
	name: mongoose.SchemaDefinitionProperty | string
	description: mongoose.SchemaDefinitionProperty | string
	repository: mongoose.SchemaDefinitionProperty | string
	link: mongoose.SchemaDefinitionProperty | string
	images: mongoose.SchemaDefinitionProperty[] | string[]
	techUsed: mongoose.SchemaDefinitionProperty | string
	user: mongoose.SchemaDefinitionProperty | string
}

export interface IEducation {
	courseName: mongoose.SchemaDefinitionProperty | string
	year: {
		started: mongoose.SchemaDefinitionProperty | Date
		ended: mongoose.SchemaDefinitionProperty | Date
	}
	hasDegree: mongoose.SchemaDefinitionProperty | boolean
	user: mongoose.SchemaDefinitionProperty | string
}

// import { config } from "dotenv"
import { dotenv } from '@modules'
dotenv()

//env
export const PORT: number = parseInt(process.env?.PORT! as string) || 5000
export const APP_NAME: string = process.env?.APP_NAME || 'expressapp'
export const PRODUCTION: boolean = (process.env?.NODE_ENV || 'development') === 'production'
export const APP_KEY: string = process.env?.APP_KEY || `${APP_NAME}123`

export const JWT_SECRET: string = process.env?.JWT_SECRET || `${APP_NAME}123456`
export const JWT_REFRESH_SECRET: string = process.env?.JWT_REFRESH_SECRET || `${APP_NAME}123456789`

export const MONGO_URI: string = process.env?.MONGO_URI || `mongodb://localhost:27017/${APP_NAME}`

export const RAPIDAPI_EMAIL_URL: string = process.env?.RAPIDAPI_EMAIL_URL || ''
export const RAPIDAPI_EMAIL_HOST: string = process.env?.RAPIDAPI_EMAIL_HOST || ''
export const RAPIDAPI_EMAIL_KEY: string = process.env?.RAPIDAPI_EMAIL_KEY || ''

export const APP_EMAIL: string = process.env?.APP_EMAIL || `${APP_NAME}@test.com`

export { default as SESSION_OPTIONS } from './sessionOptions'

export * from './rateLimit'

export { connectDB } from './db'

export { default as corsOption } from './cors'

export { default as WHITELIST } from './cors/whitelist'

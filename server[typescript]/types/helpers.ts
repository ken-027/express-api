// import type { UploadedFile } from 'express-fileupload'
export type TFile = {
	fieldname: string
	originalname: string
	mimetype: string
	size: number
	path: string
	encoding: string
	filename: string
	destination: string
}
export interface IFileUpload {
	file: TFile
	location?: string
	ext?: string | null
	type?: 'images' | 'pdf' | 'files'
	name: string
}

export interface IReturnUpload {
	filePath: string
	saveFile: () => void
}

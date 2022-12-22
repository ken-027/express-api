import { TFile } from '@types'
/* eslint-disable indent */
export const isImage = (file: TFile): boolean | TFile => {
	const mimeType = file?.mimetype
	switch (mimeType) {
		case 'image/png':
		case 'image/jpeg':
			return file
		default:
			return false
	}
}

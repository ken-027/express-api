/* eslint-disable indent */
export const isImage = (file: object & { mimetype?: string }) => {
	console.log(file?.mimetype)
	const mimeType = file?.mimetype
	switch (mimeType) {
		case 'image/png':
		case 'image/jpeg':
			return file
		default:
			return false
	}
}

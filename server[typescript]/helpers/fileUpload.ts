import { BASE_PATH } from '@config'
import { path, fs } from '@modules'
import { hashFile } from '@helpers'
import { IFileUpload, IReturnUpload } from '@types'

const fileUpload = ({
	file,
	location = '',
	ext = null,
	name,
	type = 'images',
}: IFileUpload): IReturnUpload => {
	const parentPath = `${BASE_PATH}/storage/`

	const encryptImg = hashFile(file?.filename)
	const extName = path.extname(file?.originalname)
	const fileName = `${encryptImg}${ext ?? extName}`
	const directory = `${parentPath}${location}/${type}/${name
		?.toLowerCase()
		.replace(/\s/g, '')}`

	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory, {
			recursive: true,
		})
	}

	const imagePath = `${directory}/${fileName}`

	return {
		filePath: imagePath,
		saveFile: () =>
			fs.rename(file?.path, imagePath, err => {
				if (err) {
					throw new Error(err?.message)
				}
			}),
	}
}

export default fileUpload

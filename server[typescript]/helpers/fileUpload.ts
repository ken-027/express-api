import { PRODUCTION } from '@config'
import { path, fs } from '@modules'
import { hashFile } from '@helpers'
import { IFileUpload, IReturnUpload } from '@types'

// const fileUpload = ({ file, location = '', ext = null, name, type = 'images' }: IFileUpload): IReturnUpload => {
//   const encryptImg = hashFile(file.name)
//   const extName = path.extname(file.name)
//   const fileName = `${encryptImg}${ext ?? extName}`
//   const imagePath = `${location}/${name?.toLowerCase().replace(/\s/g, '')}/${fileName}`

//   return {
//     filePath: imagePath,
//     saveFile: () => file.mv(`./server[${PRODUCTION ? 'express' : 'typescript'}]/storage/${type}/${imagePath}`)
//   }
// }

const fileUploadv2 = ({
  file,
  location = '',
  ext = null,
  name,
  type = 'images',
}: IFileUpload): IReturnUpload => {
  const parentPath = `server[${PRODUCTION ? 'express' : 'typescript'}]/storage/`

  const encryptImg = hashFile(file?.filename)
  const extName = path.extname(file?.originalname)
  const fileName = `${encryptImg}${ext ?? extName}`
  const directory = `${parentPath}${location}/${type}/${name?.toLowerCase().replace(/\s/g, '')}`

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, {
      recursive: true
    })
  }

  const imagePath = `${directory}/${fileName}`

  console.log(imagePath)
  return {
    filePath: imagePath,
    saveFile: () => fs.rename(file.path, imagePath, (err) => {
      if (err) {
        throw new Error(err?.message)
      }
    })
  }
}

export default fileUploadv2
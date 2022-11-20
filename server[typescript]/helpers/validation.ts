export const isImage = (file: any) => {
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

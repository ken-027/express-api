// import type { UploadedFile } from 'express-fileupload'

export interface IFileUpload {
  file: any
  location?: string
  ext?: string | null
  type?: 'images' | 'pdf' | 'files'
  name: string
}

export interface IReturnUpload {
  filePath: string,
  saveFile: () => void
}
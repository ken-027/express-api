import { APP_NAME } from '@config'
import { cryptojs, fs, colors, path } from '@modules'

const appName = APP_NAME || 'app_name'

const appKey = cryptojs.SHA256(appName, 'ken@27').toString()
const tokenSecret = cryptojs.SHA256(appName + '01', 'ken@27').toString()
const refreshSecret = cryptojs.SHA256(appName + '02', 'ken@27').toString()
const createdFile = fs.createWriteStream(path.join(__dirname, '../.env'))

createdFile.write(`APP_NAME=${appName}\n`)
createdFile.write('APP_EMAIL=\n')
createdFile.write(`NODE_ENV=${'development'}\n`)
createdFile.write(`PORT=${5000}\n\n`)

createdFile.write(`APP_KEY=${appKey}\n`)
createdFile.write(`JWT_REFRESH_SECRET=${refreshSecret}\n`)
createdFile.write(`JWT_SECRET=${tokenSecret}\n\n`)

createdFile.write(`MONGO_URI=mongodb://localhost:27017/${appName}\n\n`)

createdFile.write('RAPIDAPI_EMAIL_KEY=\n')
createdFile.write('RAPIDAPI_EMAIL_URL=\n')
createdFile.write('RAPIDAPI_EMAIL_HOST=\n')

createdFile.end()

console.log(colors.green('Generated env. file successfully'))

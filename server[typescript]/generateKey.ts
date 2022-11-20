import crypto from 'crypto-js'
import fs from 'fs'
import path from 'path'
import colors from 'colors'
import { APP_NAME } from './config'

const appKey = crypto.SHA256(APP_NAME, 'ken@27').toString()
const tokenSecret = crypto.SHA256(APP_NAME + '01', 'ken@27').toString()
const refreshSecret = crypto.SHA256(APP_NAME + '02', 'ken@27').toString()
const createdFile = fs.createWriteStream(
  path.join(__dirname, '../app.key'), {
}
)

createdFile.write(`APP_KEY=${appKey}\n`)
createdFile.write(`TOKEN_KEY=${tokenSecret}\n`)
createdFile.write(`REFRESH_KEY=${refreshSecret}\n`)
createdFile.end()

console.log(colors.green('Generated key successfully'))
console.log(colors.yellow('You can view it on app.key'))

import {
  createStream,
  moment,
  path
} from '@modules'

export const errorLogger = (message: string | any) => {
  const fs = createStream(
    `${moment().format('YYYY-MM').toString()}_error.log`,
    {
      interval: '1M',
      path: path.join(__dirname, '../logs/error'),
    }
  )

  fs.write(`[${moment().format('YYYY-MM-DD H:mm:ss')}] ${message}`)
  fs.end('\n\n')
  return fs
}

export const requestLogger = createStream(
  `${moment().format('YYYY-MM').toString()}_request.log`,
  {
    interval: '1M',
    path: path.join(__dirname, '../logs/request'),
  }
)


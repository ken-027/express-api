//* importing modules
import {
  connectDB,
  corsOption,
  requestLimit,
  SESSION_OPTIONS,
  PRODUCTION,
  PORT,
} from '@config'

import {
  errorHandler
} from '@middlewares/index'

import {
  userRoutes,
  authRoutes,
  skillRoutes,
} from '@routes/index'

import {
  requestLogger,
} from '@helpers/index'

import {
  Express,
  Request,
  Response,
  express,
  cors,
  helmet,
  cookieParser,
  session,
  bodyParser,
  morgan,
  swaggerUi,
  path,
  colors,
} from '@modules'
const swaggerDocument = require('./api-docs/openapi.json')

//* importing custom modules
// import { requestLimit } from './config/rateLimit'
// import errorHandler from './middlewares/errorMiddleware'
// import { requestLogger } from './helpers/logger'

// import {
//   PORT,
//   PRODUCTION,
//   connectDB,
//   corsOption,
//   SESSION_OPTIONS
// } from './config'

//* importing routes
// import userRoutes from './routes/userRoutes'
// import authRoutes from './routes/authRoutes'
// import skillRoutes from './routes/skillRoutes'


//* declaration
const app: Express = express()
// TODO const cache = apiCache.middleware

//* database configuration
connectDB()

//* caching
// TODO app.use(cache('0 minutes'))

//* for securities
app.use(cors(corsOption))
app.use(helmet())
app.use(cookieParser())
app.use(requestLimit)
// TODO app.set('trust proxy', 1) // trust proxy
app.use(session(SESSION_OPTIONS))

//* fileupload
// app.use(fileUpload({
//   safeFileNames: true,
//   createParentPath: true,
//   limits: {
//     fileSize: 2 * 1024 * 1024 // 2MB
//   }
// }))

//* decode request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(PRODUCTION ? morgan('combined', { stream: requestLogger, skip: (req: Request, res: Response) => res.statusCode < 400 }) : morgan('dev'))

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/skills', skillRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


//* static files
app.use(express.static(__dirname + '/storage'))

if (PRODUCTION) {
  app.use(express.static(path.join(__dirname, '../frontend[react]/dist')))
  app.get('*', (req: Request, res: Response) => res.sendFile(path.resolve(__dirname, '../', 'frontend[react]', 'dist', 'index.html')))
} else {
  app.get('/', (req: Request, res: Response) => res.sendFile(__dirname + '/public/index.html'))
}

//* 404 not found api endpoint
app.use('/', (req: Request, res: Response) => {
  res.status(404).json({
    message: `endpoint ${req.originalUrl} doest not exists!`,
  })
})

//* error middlewares
app.use(errorHandler)

app.listen(PORT, () => console.log(colors.blue(`Server is running on port ${PORT}`)))

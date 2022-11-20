import {
  SessionOptions,
} from '@modules'

import {
  APP_KEY,
  PRODUCTION,
} from '@config'

const SESSION_OPTIONS: SessionOptions = {
  secret: APP_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: PRODUCTION ? true : false },
}

export default SESSION_OPTIONS

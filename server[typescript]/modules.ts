import express from 'express'
import colors from 'colors'
import helmet from 'helmet'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { config as dotenv } from 'dotenv'
import morgan from 'morgan'
import limiter from 'express-rate-limit'
// import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser'

import type { Request, Response, NextFunction, Express } from 'express'
import type { CorsOptions } from 'cors'
import type { SessionOptions } from 'express-session'

import bcryptjs from 'bcryptjs'
import fs from 'fs'
import asyncHandler from 'express-async-handler'
import cryptojs from 'crypto-js'
import joi from 'joi'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import path from 'path'
import moment from 'moment'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
import { createStream } from 'rotating-file-stream'

export {
  Request,
  Response,
  NextFunction,
  Express,
  CorsOptions,
  SessionOptions,
  bcryptjs,
  asyncHandler,
  cryptojs,
  joi,
  axios,
  path,
  moment,
  createStream,
  colors,
  swaggerUi,
  fs,
  express,
  helmet,
  jwt,
  cors,
  session,
  cookieParser,
  morgan,
  bodyParser,
  mongoose,
  dotenv,
  limiter,
}



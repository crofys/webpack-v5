import dotenv from 'dotenv'
import { Resolve } from './resolve'

const env = process.env.ENV

const { parsed } = dotenv.config({
  path: Resolve(`env/.env.${env}`),
})

// if (!parsed) {
//   throw new Error('未读取项目配置文件')
// }
export const Config: any = parsed

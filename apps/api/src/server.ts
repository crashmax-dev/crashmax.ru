import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import fastifyAutoload from '@fastify/autoload'
import { envSchema } from './config.js'
import { joinPath } from './utils/path.js'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

const fastify = Fastify({
  trustProxy: true,
  logger: {
    enabled: process.env.NODE_ENV === 'development',
    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
        ignore: 'time,pid,hostname',
        colorize: true
      }
    }
  }
}).withTypeProvider<TypeBoxTypeProvider>()

fastify.register(fastifyEnv, {
  schema: envSchema,
  dotenv: {
    path: joinPath(import.meta, '../.env')
  }
})

fastify.register(fastifyAutoload, {
  dir: joinPath(import.meta, 'plugins')
})

fastify.register(fastifyAutoload, {
  dir: joinPath(import.meta, 'routes')
})

const host = process.env.APP_IP ?? 'localhost'
const port = process.env.APP_PORT ?? 8000

fastify.listen(
  { host, port },
  (err, host) => {
    if (err) {
      // console.log(err)
      return
    }

    console.log(host)
  }
)

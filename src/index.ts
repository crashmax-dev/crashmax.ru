import 'dotenv/config'
import fastify from 'fastify'
import fastifyAutoload from '@fastify/autoload'
import { joinPath } from './utils/path.js'
import { ajvTypeBoxPlugin } from '@fastify/type-provider-typebox'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

const server = fastify({
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
  },
  ajv: {
    plugins: [ajvTypeBoxPlugin]
  }
}).withTypeProvider<TypeBoxTypeProvider>()

server.register(fastifyAutoload, {
  dir: joinPath(import.meta, 'plugins')
})

server.register(fastifyAutoload, {
  dir: joinPath(import.meta, 'routes')
})

const { APP_IP, APP_PORT } = process.env
server.listen(
  { host: APP_IP, port: APP_PORT },
  (err, address) => {
    if (err) throw err
    console.log(`Server running at ${address}`)
  }
)

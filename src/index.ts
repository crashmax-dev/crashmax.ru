import 'dotenv/config'
import fastify from 'fastify'
import fastifyAutoload from '@fastify/autoload'
import { joinPath } from './utils/path.js'

const server = fastify({
  logger: process.env.NODE_ENV !== 'production'
})

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

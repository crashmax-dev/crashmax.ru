import 'dotenv/config'
import Fastify from 'fastify'
import fastifyAutoload from '@fastify/autoload'
import { joinPath } from './utils/path.js'
import { ajvTypeBoxPlugin } from '@fastify/type-provider-typebox'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

export function buildServer() {
  const fastify = Fastify({
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

  fastify.register(fastifyAutoload, {
    dir: joinPath(import.meta, 'plugins')
  })

  fastify.register(fastifyAutoload, {
    dir: joinPath(import.meta, 'routes')
  })

  return fastify
}

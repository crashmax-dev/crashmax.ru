import Fastify from 'fastify'
import fastifyAutoload from '@fastify/autoload'
import fastifyEnv from '@fastify/env'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { envSchema } from './config.js'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export async function buildServer() {
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

  const filePath = (...paths: string[]) => resolve(
    dirname(fileURLToPath(import.meta.url)),
    ...paths
  )

  await fastify.register(fastifyEnv, {
    schema: envSchema,
    dotenv: {
      path: filePath('..', '.env')
    }
  })

  await fastify.register(fastifyAutoload, {
    dir: filePath('plugins')
  })

  await fastify.register(fastifyAutoload, {
    dir: filePath('routes')
  })

  return fastify
}

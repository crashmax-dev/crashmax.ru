import fp from 'fastify-plugin'
import { fileURLToPath } from 'node:url'
import fastifyStatic from '@fastify/static'
import type { FastifyStaticOptions } from '@fastify/static'
import { dirname, resolve } from 'node:path'

export default fp<FastifyStaticOptions>(async (fastify) => {
  const staticPath = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'web', 'dist')
  fastify.register(fastifyStatic, {
    root: [staticPath]
  })
})

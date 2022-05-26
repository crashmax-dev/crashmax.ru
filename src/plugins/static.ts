import fp from 'fastify-plugin'
import fastifyStatic from '@fastify/static'
import { joinPath } from '../utils/path.js'
import type { FastifyStaticOptions } from '@fastify/static'

export default fp<FastifyStaticOptions>(async (fastify) => {
  fastify.register(fastifyStatic, {
    root: [joinPath(import.meta, '../../client/dist')]
  })
})

import type { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/healthcheck', (request, reply) => {
    reply.send({ ok: true })
  })
}

export default root

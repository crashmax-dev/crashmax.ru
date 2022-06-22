import type { FastifyPluginAsync } from 'fastify'

const terminal: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', (request, reply) => {
    return reply.terminal()
  })
}

export default terminal

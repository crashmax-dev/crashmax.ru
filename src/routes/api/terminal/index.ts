import type { FastifyPluginAsync } from 'fastify'

const terminal: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async (request, reply) => {
    return reply.terminalApi()
  })
}

export default terminal

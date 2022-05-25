import type { FastifyPluginAsync } from 'fastify'

const home: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async (request, reply) => {
    request.terminalSession()
    return reply.sendFile('/index.html')
  })
}

export default home

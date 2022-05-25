import type { FastifyPluginAsync } from 'fastify'

const email: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/', async (request, reply) => {
    return reply.sendMail(request)
  })
}

export default email

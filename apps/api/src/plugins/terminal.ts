import os from 'node:os'
import fp from 'fastify-plugin'

declare module 'fastify' {
  interface FastifyReply {
    terminal(): void
  }
}

export default fp(async (fastify) => {
  const sessions = new Map<string, number>()
  const sessionLife = 60 * 1000 * 10 // 10 minutes

  fastify.decorateReply('terminal', async function () {
    const contacts = await fastify.prisma.links.findMany({
      where: {
        status: true
      },
      select: {
        title: true,
        href: true
      }
    })

    this.send({
      contacts,
      terminal: {
        loadavg: os.loadavg(),
        uptime: os.uptime(),
        online: sessions.size
      }
    })
  })

  fastify.get('/', (request, reply) => {
    const now = Date.now()

    for (const [ip, timestamp] of sessions.entries()) {
      if (timestamp + sessionLife < now) {
        sessions.delete(ip)
      }
    }

    sessions.set(request.ip, now)
    reply.sendFile('/index.html')
  })
})

import { buildServer } from './server.js'

const fastify = await buildServer()

try {
  const host = process.env.APP_IP ?? 'localhost'
  const port = process.env.APP_PORT ?? 8000
  const address = await fastify.listen({ host, port })
  console.log(`Server running at ${address}`)
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

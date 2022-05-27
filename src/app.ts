import { buildServer } from './server.js'

const fastify = buildServer()

try {
  const address = await fastify.listen(
    {
      host: process.env.APP_IP,
      port: process.env.APP_PORT
    }
  )

  console.log(`Server running at ${address}`)
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

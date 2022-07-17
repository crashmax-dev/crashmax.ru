import type { FastifyPluginAsync, RouteShorthandOptions } from 'fastify'
import { createTransport } from 'nodemailer'
import { Type } from '@sinclair/typebox'
import type { Static } from '@sinclair/typebox'

const body = Type.Object({
  to: Type.String({ format: 'email' }),
  from: Type.Optional(Type.String()),
  subject: Type.Optional(Type.String()),
  text: Type.String(),
  token: Type.String()
})

type Request = {
  Body: Static<typeof body>
}

const routeOptions: RouteShorthandOptions = {
  schema: {
    body
  }
}

const email: FastifyPluginAsync = async (fastify): Promise<void> => {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } = fastify.config
  const transporter = createTransport(
    `smtp://${EMAIL_USER}:${EMAIL_PASS}@${EMAIL_HOST}:${EMAIL_PORT}`,
    { from: `crashmax.ru <${EMAIL_USER}>` }
  )

  fastify.addHook<Request>('preHandler', (request, reply, done) => {
    if (fastify.config.EMAIL_TOKEN !== request.body.token) {
      throw fastify.httpErrors.unauthorized()
    }

    done()
  })

  fastify.post<Request>('/', routeOptions, async (request, reply) => {
    return await transporter.sendMail(request.body)
  })
}

export default email

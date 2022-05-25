import fp from 'fastify-plugin'
import { createTransport } from 'nodemailer'
import type { SendMailOptions } from 'nodemailer'

declare module 'fastify' {
  export interface FastifyReply {
    sendMail(request: FastifyRequest): void
  }
}

export default fp(async (fastify) => {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } = process.env
  const transporter = createTransport(
    `smtp://${EMAIL_USER}:${EMAIL_PASS}@${EMAIL_HOST}:${EMAIL_PORT}`
  )

  fastify.decorateReply('sendMail', async function () {
    const body = this.request.body as MailOptions

    if (process.env.EMAIL_TOKEN === body?.token) {
      delete body.token
      return await transporter.sendMail(body)
    }

    throw fastify.httpErrors.forbidden()
  })
})

// TODO: validate request body (@sinclair/typebox, json-schema-to-typescript)
type MailOptions = Pick<SendMailOptions, 'to' | 'from' | 'subject' | 'text'> & {
  token?: string
}

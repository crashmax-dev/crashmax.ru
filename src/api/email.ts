import { createTransport } from 'nodemailer'
import type { Transporter, SendMailOptions } from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

export type SendOptions = Pick<SendMailOptions, 'to' | 'subject' | 'text'> & { token?: string }

export class Mailer {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>

  constructor() {
    const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } = process.env
    this.transporter = createTransport(
      `smtp://${EMAIL_USER}:${EMAIL_PASS}@${EMAIL_HOST}:${EMAIL_PORT}`,
      { from: `crashmax <${process.env.EMAIL_USER}>` }
    )
  }

  async send(options: SendOptions): Promise<SMTPTransport.SentMessageInfo> {
    if (process.env.EMAIL_TOKEN === options.token) {
      return await this.transporter.sendMail(options)
    }

    throw new Error('Access denied')
  }
}

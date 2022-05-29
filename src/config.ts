declare module 'fastify' {
  interface FastifyInstance {
    config: {
      APP_PORT: number
      APP_IP: string
      DATABASE_URL: string
      EMAIL_HOST: string
      EMAIL_PORT: number
      EMAIL_USER: string
      EMAIL_PASS: string
      EMAIL_TOKEN: string
    }
  }
}

export const envSchema = {
  type: 'object',
  required: [
    'DATABASE_URL',
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_USER',
    'EMAIL_PASS',
    'EMAIL_TOKEN'
  ],
  properties: {
    APP_PORT: {
      type: 'integer',
      default: 8000
    },
    APP_IP: {
      type: 'string',
      default: 'localhost'
    },
    DATABASE_URL: {
      type: 'string'
    },
    EMAIL_HOST: {
      type: 'string'
    },
    EMAIL_PORT: {
      type: 'integer'
    },
    EMAIL_USER: {
      type: 'string'
    },
    EMAIL_PASS: {
      type: 'string'
    },
    EMAIL_TOKEN: {
      type: 'string'
    }
  }
}

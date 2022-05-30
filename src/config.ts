declare module 'fastify' {
  interface FastifyInstance {
    config: NodeJS.ProcessEnv
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
    APP_IP: {
      type: 'string'
    },
    APP_PORT: {
      type: 'integer'
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

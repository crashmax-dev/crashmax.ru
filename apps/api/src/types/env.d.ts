declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    APP_IP: string
    APP_PORT: number
    DATABASE_URL: string
    EMAIL_HOST: string
    EMAIL_PORT: number
    EMAIL_USER: string
    EMAIL_PASS: string
    EMAIL_TOKEN: string
  }
}

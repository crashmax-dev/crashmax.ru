declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    APP_PORT: number
    APP_IP: string
    DB_USER: string
    DB_PASS: string
    DB_NAME: string
    EMAIL_HOST: string
    EMAIL_PORT: number
    EMAIL_USER: string
    EMAIL_PASS: string
    EMAIL_TOKEN: string
  }
}

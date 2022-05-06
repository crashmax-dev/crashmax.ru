declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    APP_PORT: number
    APP_IP: string
    DBUSER: string
    DBPASS: string
    DBNAME: string
    EMAIL_HOST: string
    EMAIL_PORT: number
    EMAIL_TOKEN: string
    EMAIL_USER: string
    EMAIL_PASS: string
  }
}

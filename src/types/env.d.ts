declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    APP_PORT: number
    APP_IP: string
    DBUSER: string
    DBPASS: string
    DBNAME: string
  }
}

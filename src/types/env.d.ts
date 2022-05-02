declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    MYSQL_URI: string
    APP_IP: string
    APP_PORT: number
  }
}

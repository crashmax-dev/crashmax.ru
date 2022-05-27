declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    APP_IP: string
    APP_PORT: number
  }
}

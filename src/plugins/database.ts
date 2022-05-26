import fp from 'fastify-plugin'
import mysql from 'mysql2/promise'

declare module 'fastify' {
  interface FastifyInstance {
    db: mysql.Pool
  }
}

export default fp(async (fastify) => {
  const { DB_NAME, DB_PASS, DB_USER, NODE_ENV } = process.env

  const db = mysql.createPool({
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    socketPath: NODE_ENV === 'production'
      ? '/var/run/mysqld/mysqld.sock'
      : undefined
  })

  fastify.decorate('db', db)
})

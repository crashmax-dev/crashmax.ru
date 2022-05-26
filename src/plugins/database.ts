import fp from 'fastify-plugin'
import mysql from 'mysql2/promise'

declare module 'fastify' {
  interface FastifyInstance {
    db: mysql.Pool
  }
}

export default fp(async (fastify) => {
  const { DBNAME, DBPASS, DBUSER, NODE_ENV } = process.env

  const db = mysql.createPool({
    user: DBUSER,
    password: DBPASS,
    database: DBNAME,
    socketPath: NODE_ENV === 'production'
      ? '/var/run/mysqld/mysqld.sock'
      : undefined
  })

  fastify.decorate('db', db)
})

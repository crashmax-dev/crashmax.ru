import 'dotenv/config'
import os from 'node:os'
import mysql from 'mysql2/promise'
import fastify from 'fastify'
import fastifyStatis from '@fastify/static'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const { APP_IP, APP_PORT, DBNAME, DBPASS, DBUSER, NODE_ENV } = process.env

const server = fastify()
const db = mysql.createPool({
  user: DBUSER,
  password: DBPASS,
  database: DBNAME,
  socketPath: NODE_ENV === 'production'
    ? '/var/run/mysqld/mysqld.sock'
    : undefined
})

server.register(fastifyStatis, {
  root: join(__dirname, '../client/dist')
})

server.get('/', (_, res) => {
  res.sendFile('/index.html')
})

server.get('/api/terminal', async (_, res) => {
  const terminal = {
    loadavg: os.loadavg(),
    uptime: os.uptime()
  }

  const [contacts] = await db.query(
    'SELECT title, href, target FROM terminal WHERE status != 0'
  )

  res.send({ contacts, terminal })
})

server.listen(APP_PORT, APP_IP, (err, address) => {
  if (err) throw err
  console.log(`Server running at ${address}`)
})

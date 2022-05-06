import 'dotenv/config'
import mysql from 'mysql2/promise'
import fastify from 'fastify'
import fastifyStatis from '@fastify/static'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Terminal } from './api/terminal.js'
import { Mailer } from './api/email.js'
import type { SendOptions } from './api/email'

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

const terminal = new Terminal()
server.get(
  '/',
  (req, res) => {
    terminal.createSession(req.headers['x-forwarded-for'] as string)
    res.sendFile('/index.html')
  }
)

server.get(
  '/api/terminal',
  async () => {
    const [contacts] = await db.query(
      'SELECT title, href, target FROM terminal WHERE status != 0'
    )

    return {
      contacts,
      terminal: terminal.data
    }
  }
)

const mailer = new Mailer()
server.post<{ Body: SendOptions }>(
  '/api/email',
  async (req) => {
    return await mailer.send(req.body)
  }
)

server.listen(APP_PORT, APP_IP, (err, address) => {
  if (err) throw err
  console.log(`Server running at ${address}`)
})

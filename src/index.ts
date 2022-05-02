import 'dotenv/config'
import os from 'node:os'
import fastify from 'fastify'
import fastifyMySQL from '@fastify/mysql'
import fastifyStatis from '@fastify/static'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const server = fastify()
const __dirname = dirname(fileURLToPath(import.meta.url))
const { APP_IP, APP_PORT, MYSQL_URI } = process.env

server.register(fastifyStatis, {
  root: join(__dirname, '../client/dist')
})

server.register(fastifyMySQL, {
  type: 'pool',
  promise: true,
  connectionLimit: 2,
  connectionString: MYSQL_URI
})

server.get('/', (_, res) => {
  res.sendFile('/index.html')
})

server.get('/api/terminal', async (_, res) => {
  const terminal = {
    loadavg: os.loadavg()
  }
  const connection = await server.mysql.getConnection()
  const [contacts] = await connection.query(
    'SELECT title, href, target FROM terminal WHERE status != 0'
  )
  connection.release()
  res.send({ contacts, terminal })
})

server.listen(APP_PORT, APP_IP, (err, address) => {
  if (err) throw err
  console.log(`Server running at ${address}`)
})

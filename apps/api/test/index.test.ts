import { test } from 'tap'
import { buildServer } from '../dist/server.js'

test('GET /healthcheck', async (t) => {
  const fastify = buildServer()
  const res = await fastify.inject({
    method: 'GET',
    path: '/healthcheck'
  })

  t.equal(res.statusCode, 200)
  t.same(await res.json(), { ok: true })
})

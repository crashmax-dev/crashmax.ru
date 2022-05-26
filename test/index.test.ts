import { test } from 'tap'
import { fastify } from '../dist/index.js'

test('GET /healthcheck', async (t) => {
  const res = await fastify.inject({
    method: 'GET',
    path: '/healthcheck'
  })

  await fastify.ready()

  t.equal(res.statusCode, 200)
  t.same(await res.json(), { ok: true })
})

import fp from 'fastify-plugin'
import sensible from '@fastify/sensible'
import type { SensibleOptions } from '@fastify/sensible'

export default fp<SensibleOptions>(async (fastify) => {
  fastify.register(sensible, {
    errorHandler: false
  })
})

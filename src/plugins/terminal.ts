import os from 'node:os'
import fp from 'fastify-plugin'

declare module 'fastify' {
  export interface FastifyRequest {
    terminalSession(): void
  }

  export interface FastifyReply {
    terminalApi(): void
  }
}

export default fp(async (fastify) => {
  const terminal = new Terminal()

  fastify.decorateRequest('terminalSession', function () {
    const ipAddress = this.headers['x-forwarded-for'] as string
    terminal.createSession(ipAddress)
  })

  fastify.decorateReply('terminalApi', async function () {
    const [contacts] = await fastify.db.query(
      'SELECT title, href, target FROM terminal WHERE status != 0'
    )

    this.send({
      contacts,
      terminal: terminal.response
    })
  })
})

interface TerminalSessions {
  ip: string
  timestamp: number
}

interface TerminalResponse {
  loadavg: number[]
  uptime: number
  online: number
}

class Terminal {
  private sessions: TerminalSessions[]
  private session_expire = 60 * 1000 * 10 // 10m

  constructor() {
    this.sessions = []
  }

  get response(): TerminalResponse {
    return {
      loadavg: os.loadavg(),
      uptime: os.uptime(),
      online: this.sessions.length
    }
  }

  private getSession(ip: string): TerminalSessions | undefined {
    return this.sessions
      .find((session) => session.ip === ip)
  }

  private disposeSessions(): void {
    const now = Date.now()

    this.sessions = this.sessions
      .filter((session) => {
        return session.timestamp + this.session_expire > now
      })
  }

  createSession(ip: string): void {
    this.disposeSessions()

    const session = this.getSession(ip)
    const timestamp = Date.now()
    if (session) {
      session.timestamp = timestamp
    } else {
      this.sessions.push({
        ip,
        timestamp
      })
    }
  }
}

import os from 'node:os'

interface TerminalSessions {
  ip: string
  timestamp: number
}

export class TerminalApi {
  private sessions: TerminalSessions[]
  private session_expire = 60 * 1000 * 10 // 10m

  constructor() {
    this.sessions = []
  }

  get data() {
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

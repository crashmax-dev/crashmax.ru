export interface Contacts {
  title: string
  href: string
  target: string
}

export interface Terminal {
  loadavg: number[]
  uptime: number
  online: number
}

export interface ApiResponse {
  terminal: Terminal
  contacts: Contacts[]
}

export async function fetchTerminal(): Promise<ApiResponse> {
  const response = await fetch('/api/terminal')
  return (await response.json()) as ApiResponse
}

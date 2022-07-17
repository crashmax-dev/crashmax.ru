import { el } from 'redom'
import { Matrix } from '@crashmax/canvas-matrix2d'
import { fetchTerminal } from './api'
import { currentTime, declOfNum, lifeDate } from './utils'

const contacts = document.getElementById('contacts')!
const life = document.getElementById('life')!
const load = document.getElementById('load')!
const time = document.getElementById('time')!
const date = document.getElementById('date')!
const online = document.getElementById('online')!
const matrix = document.getElementById('matrix')!
const terminal = document.getElementById('terminal')!
const terminalHeader = document.getElementById('move_header')!
const shortcut = document.getElementById('shortcut')!
const min = document.getElementById('min')!
const ovx = document.getElementById('ovx')!

const state = {
  opened: false,
  offsetWidth: terminal.offsetWidth,
  offsetHeight: terminal.offsetHeight,
  offsetLeft: terminal.offsetLeft,
  offsetTop: terminal.offsetTop,
  yPos: 0,
  xPos: 0
}

async function main() {
  const res = await fetchTerminal()

  online.textContent = `${res.terminal.online} ${declOfNum(
    res.terminal.online,
    [
      'user',
      'users',
      'users'
    ]
  )}`
  load.textContent = res.terminal.loadavg.join(', ')
  life.textContent = lifeDate()

  for (const contact of res.contacts) {
    const tr = el('tr', {
      className: 'list_item'
    })

    const link = el(
      'a',
      {
        href: contact.href,
        target: '_blank'
      },
      contact.title
    )

    const td = el('td', [
      el('div', {
        className: `ico ico-${contact.title.toLowerCase()}_16`
      }),
      link
    ])

    tr.appendChild(td)
    contacts.appendChild(tr)
  }

  setInterval(() => renderTime(), 1000)
}

renderTime()
main()

function renderTime() {
  const { hm, hms } = currentTime()
  time.textContent = hms
  date.textContent = hm
}

function terminalMove(event: MouseEvent) {
  if (state.opened) {
    terminal.style.margin = '0px'
    terminal.style.top = event.pageY - state.yPos + 'px'
    terminal.style.left = event.pageX - state.xPos + 'px'
  }
}

shortcut.addEventListener('click', () => {
  terminal.style.display = ''
  shortcut.style.display = 'none'
  state.offsetLeft = terminal.offsetLeft
  state.offsetTop = terminal.offsetTop
  state.yPos = 0
  state.xPos = 0
  state.opened = true
})

min.addEventListener('click', () => {
  terminal.style.display = 'none'
  shortcut.style.display = ''
})

ovx.addEventListener('click', () => {
  if (state.opened) {
    state.offsetWidth = terminal.offsetWidth
    state.offsetHeight = terminal.offsetHeight
    terminalHeader.style.width = 'inherit'
    terminal.style.width = 'auto'
    terminal.style.height = 'auto'
    terminal.style.maxWidth = window.outerWidth + 'px'
    terminal.style.maxHeight = window.outerHeight + 'px'
    terminal.style.margin = '0'
    terminal.style.top = '0'
    terminal.style.left = '0'
    terminal.style.right = '0'
    terminal.style.bottom = '0'
    terminal.style.position = 'absolute'
    state.opened = false
    ovx.title = 'В оконный режим'
  } else {
    terminalHeader.style.width = state.offsetWidth - 5 + 'px'
    terminal.style.width = state.offsetWidth + 'px'
    terminal.style.height = state.offsetHeight + 'px'
    terminal.style.maxWidth = state.offsetWidth + 'px'
    terminal.style.maxHeight = state.offsetHeight + 'px'
    terminal.style.top = '0'
    terminal.style.left = '0'
    terminal.style.right = ''
    terminal.style.bottom = ''
    state.opened = true
    ovx.title = 'Во весь экран'
  }

  state.offsetLeft = 0
  state.offsetTop = 0
  state.yPos = 0
  state.xPos = 0
})

terminalHeader.addEventListener('mousedown', (event) => {
  terminalHeader.style.cursor = 'move'
  state.yPos = event.pageY - state.offsetTop
  state.xPos = event.pageX - state.offsetLeft
  document.addEventListener('mousemove', terminalMove)
})

document.addEventListener('mouseup', () => {
  document.removeEventListener('mousemove', terminalMove)
  terminalHeader.style.cursor = ''
  state.offsetLeft = terminal.offsetLeft
  state.offsetTop = terminal.offsetTop
})

window.addEventListener('resize', () => {
  if (state.opened) {
    terminal.style.maxWidth = window.innerWidth + 'px'
    terminal.style.maxHeight = window.innerHeight + 'px'
  }
})

new Matrix(matrix, {
  font: {
    family: 'Matrix',
    file: 'matrix.regular.ttf',
    size: 12
  }
}).start()

// function rmrf() {
//   const pointer = el('span', {
//     style: {
//       backgroundColor: '#f5f5f5',
//       color: '#f5f5f5'
//     }
//   }, 'A')

//   document.body.style.userSelect = 'none'
//   document.body.style.backgroundColor = '#000000'
//   document.body.style.color = '#f5f5f5'
//   document.body.style.padding = '10px'

//   setInterval(() => {
//     pointer.style.visibility = pointer.style.visibility === 'hidden'
//       ? 'visible'
//       : 'hidden'
//   }, 500)

//   document.body.innerHTML = 'Fatal error: file system check failed.<br />Please, reboot now '
//   document.body.appendChild(pointer)
// }

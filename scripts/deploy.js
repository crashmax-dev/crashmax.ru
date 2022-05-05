import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { deploy } from 'deploy-toolkit'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config = {
  ssh: {
    host: '91.201.52.233',
    username: 'c55038',
    privateKeyPath: '~/.ssh/id_rsa',
    passphrase: '12345',
    agent: 'pageant'
  },
  log: true,
  cmds: [
    {
      type: 'cmd',
      args: ['rm', '-rf', 'dist'],
      cwd: 'crashmax.ru/app/client/'
    },
    {
      type: 'upload',
      src: join(__dirname, '../dist/'),
      dest: 'crashmax.ru/app/dist'
    },
    {
      type: 'upload',
      src: join(__dirname, '../client/dist/'),
      dest: 'crashmax.ru/app/client/dist'
    },
    {
      type: 'cmd',
      args: ['touch', 'reload'],
      cwd: 'crashmax.ru/'
    }
  ]
}

deploy(config).catch((err) => {
  console.log(err)
})

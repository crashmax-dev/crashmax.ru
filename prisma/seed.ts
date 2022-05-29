import { PrismaClient } from '@prisma/client'
import type { Prisma } from '@prisma/client'

const links: Prisma.LinksCreateInput[] = [
  {
    title: 'GitHub',
    href: 'https://github.com/crashmax-dev'
  },
  {
    title: 'Twitch',
    href: 'https://twitch.tv/vs_code'
  },
  {
    title: 'Steam',
    href: 'https://steamcommunity.com/id/crashmax'
  },
  {
    title: 'Telegram',
    href: 'https://t.me/crashmax'
  },
  {
    title: 'Discord',
    href: 'https://dsc.bio/crashmax'
  }
]

const prisma = new PrismaClient()

async function main() {
  for (const link of links) {
    await prisma.links.create({
      data: link
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

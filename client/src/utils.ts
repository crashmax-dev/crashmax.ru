export function randomInt(a: number, b: number) {
  return Math.round(Math.random() * (b - a)) + a
}

export function currentTime() {
  const date = new Date()
  let h: string | number = date.getHours()
  let m: string | number = date.getMinutes()
  let s: string | number = date.getSeconds()

  if (h <= 9) h = '0' + h
  if (m <= 9) m = '0' + m
  if (s <= 9) s = '0' + s

  const hms = h + ':' + m + ':' + s
  const hm = h + ':' + m

  return {
    hms: hms,
    hm: hm
  }
}

export function lifeDate() {
  const startDate = new Date('December 19, 2015')
  const nowDate = new Date
  const days = Math.round((nowDate.getTime() - startDate.getTime()) / 8_640_000_0)

  return (days > 0 ? days + ' ' + declOfNum(days, ['day', 'days', 'days']) + '' : '')
}

export const declOfNum = (number: number, titles: string[]): string => {
  const cases = [2, 0, 1, 1, 1, 2]

  return titles[(number % 100 > 4 && number % 100 < 20)
    ? 2
    : cases[(number % 10 < 5) ? number % 10 : 5]]
}

import { fileURLToPath } from 'node:url'
import { join, dirname as pathDirname } from 'node:path'

export function dirname(importMeta: ImportMeta): string {
  return pathDirname(filename(importMeta))
}

export function filename(importMeta: ImportMeta): string {
  return importMeta.url ? fileURLToPath(importMeta.url) : ''
}

export function joinPath(importMeta: ImportMeta, path: string): string {
  return join(dirname(importMeta), path)
}

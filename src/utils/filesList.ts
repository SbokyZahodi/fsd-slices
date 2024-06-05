import { promises } from 'node:fs'

export default async (path: string) => {
  return await promises.readdir(path)
}

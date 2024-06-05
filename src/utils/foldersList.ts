import { promises as fsPromises, readdir } from 'node:fs'
import path from 'node:path'

/** Returns a list of folders in a directory */
export default (dir: string) => {
  return new Promise<string[]>((resolve, reject) => {
    readdir(dir, async (err, files) => {
      if (err) {
        reject(err)
        console.error(err)
        return
      }

      const folders = await Promise.all(files.map(async (file) => {
        const isDirectory = (await fsPromises.lstat(path.join(dir, file))).isDirectory()
        return isDirectory ? file : null
      }))

      resolve(folders.filter(Boolean) as string[])
    })
  })
}

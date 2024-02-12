import { promises as fsPromises } from 'node:fs'
import path from 'node:path'

export async function recode(source: string, target: string, name: string): Promise<void> {
  await fsPromises.mkdir(target, { recursive: true }).catch(() => {})

  const isSourceDirectory = (await fsPromises.lstat(source)).isDirectory()
  if (isSourceDirectory) {
    const files = await fsPromises.readdir(source)

    for (const file of files) {
      const curSource = path.join(source, file)
      const isDirectory = (await fsPromises.lstat(curSource)).isDirectory()

      if (isDirectory) {
        const curTarget = path.join(target, file)
        await recode(curSource, curTarget, name)
      }
      else {
        const targetFile = path.join(target, file)
        const changedName = targetFile.replace('[name]', name)
        await fsPromises.copyFile(curSource, changedName)

        const data = await fsPromises.readFile(changedName, 'utf-8')
        const result = data.replaceAll('recode(name)', name)
        await fsPromises.writeFile(changedName, result, 'utf-8')
      }
    }
  }
}

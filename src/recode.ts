import { promises as fsPromises } from 'node:fs'
import path from 'node:path'
import replacer from './utils/replacer'
import toCamelCase from './utils/toCamelCase'

export async function recode(source: string, target: string, name: string, include: string[], typescript?: boolean): Promise<void> {
  await fsPromises.mkdir(target, { recursive: true }).catch(() => {})

  const isSourceDirectory = (await fsPromises.lstat(source)).isDirectory()

  if (isSourceDirectory) {
    const files = await fsPromises.readdir(source)

    for (const file of files) {
      const curSource = path.join(source, file)
      const isDirectory = (await fsPromises.lstat(curSource)).isDirectory()

      if (file === '.gitkeep')
        continue

      if (isDirectory) {
        if (!include.includes(file))
          continue

        const curTarget = path.join(target, file)

        await recode(curSource, curTarget, name, include, typescript)
      }
      else {
        const targetFile = path.join(target, file)

        let changedName = targetFile.replace('[name]', toCamelCase(name))

        if (!typescript && typeof typescript !== 'undefined')
          changedName = changedName.replace('.ts', '.js')

        await fsPromises.copyFile(curSource, changedName)
        await replacer(changedName, name, include)
      }
    }
  }
}

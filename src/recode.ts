import { promises as fsPromises } from 'node:fs'
import path from 'node:path'
import replacer from './utils/replacer'
import toCamelCase from './utils/toCamelCase'

export async function recode(source: string, target: string, name: string, include: string[], typescript: boolean): Promise<void> {
  await fsPromises.mkdir(target, { recursive: true })

  const isSourceDirectory = (await fsPromises.lstat(source)).isDirectory()

  if (!isSourceDirectory)
    return

  const files = await fsPromises.readdir(source)

  for (const fileName of files) {
    const curSource = path.join(source, fileName)
    const isDirectory = (await fsPromises.lstat(curSource)).isDirectory()

    if (fileName === '.gitkeep')
      continue

    if (isDirectory) {
      if (!include.includes(fileName))
        continue

      const curTarget = path.join(target, fileName)

      await recode(curSource, curTarget, name, include, typescript)
    }
    else {
      const targetFile = path.join(target, fileName)

      let changedName = targetFile.replace('[name]', toCamelCase(name))

      if (!typescript)
        changedName = changedName.replace('.ts', '.js')

      await fsPromises.copyFile(curSource, changedName)
      await replacer(changedName, name, include)
    }
  }
}

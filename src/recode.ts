import { promises as fsPromises } from 'node:fs'
import path from 'node:path'
import contentReplacer from './utils/contentReplacer'
import createModule from './utils/createModule'
import filenameReplacer from './utils/filenameReplacer'
import filesList from './utils/filesList'
import foldersList from './utils/foldersList'

interface IOptions {
  source: string
  target: string
  sliceName: string
  exclude: string[]
  typescript: boolean | undefined
  root?: boolean
}

export async function recode({ source, target, sliceName, exclude, typescript, root = false }: IOptions): Promise<void> {
  await fsPromises.mkdir(target)

  const sliceFiles = new Set(await filesList(source))
  const sliceFolders = new Set(await foldersList(source))

  // Delete folders that should be excluded
  if (exclude.length && root) {
    for (const folder of exclude) {
      sliceFolders.delete(folder)
      sliceFiles.delete(folder)
    }
  }

  if (root && !sliceFiles.has('index.ts') && !sliceFiles.has('index.js') && sliceFolders.size)
    await createModule(target, Array.from(sliceFolders), typescript)

  for (const fileName of sliceFiles) {
    if (fileName === '.gitkeep')
      continue

    const curSource = path.join(source, fileName)
    const isDirectory = (await fsPromises.lstat(curSource)).isDirectory()
    const destination = path.join(target, fileName)

    if (isDirectory) {
      await recode({
        source: curSource,
        target: destination,
        sliceName,
        exclude,
        typescript,
      })
    }

    else {
      const replacedPath = filenameReplacer(destination, sliceName, typescript)
      await fsPromises.copyFile(curSource, replacedPath)
      await contentReplacer(replacedPath, sliceName, typescript)
    }
  }
}

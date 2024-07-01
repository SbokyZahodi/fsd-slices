import { existsSync, promises as fsPromises } from 'node:fs'
import path from 'node:path'
import { workspace } from 'vscode'
import type { IContext } from '../../registerCommand'
import contentReplacer from '../formatters/contentReplacer'
import filenameReplacer from '../formatters/filenameReplacer'
import createModule from './createModule'
import filesList from './filesList'
import foldersList from './foldersList'
import templatePath from './templatePath'

interface IParams {
  source: string
  context: IContext
  target: string
  sliceName: string
  root: boolean
}

/** Creates slice in target folder */
export async function recode({ source, context, target, sliceName, root = false }: IParams): Promise<void> {
  await fsPromises.mkdir(target)

  const files = new Set(await filesList(source))

  if (root) {
    const segments = new Set(await foldersList(source))

    // Delete folders that should be excluded
    if (context.config.foldersToExclude.length) {
      for (const folder of context.config.foldersToExclude) {
        segments.delete(folder)
        files.delete(folder)
      }
    }

    if (!files.has('index.ts') && !files.has('index.js') && segments.size)
      await createModule(target, Array.from(segments))
  }

  for (const fileName of files) {
    if (fileName === '.gitkeep')
      continue

    const curSource = path.join(source, fileName)
    const isDirectory = (await fsPromises.lstat(curSource)).isDirectory()
    const destination = path.join(target, fileName)

    if (isDirectory) {
      await recode({
        source: curSource,
        target: destination,
        context,
        sliceName,
        root,
      })
    }

    else {
      const replacedPath = filenameReplacer(destination, sliceName)
      await fsPromises.copyFile(curSource, replacedPath)
      await contentReplacer(replacedPath, sliceName)
    }
  }
}

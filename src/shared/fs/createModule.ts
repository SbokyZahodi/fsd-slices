import { writeFile } from 'node:fs'
import path from 'node:path'
import useConfig from '../config/useConfig'

/** Generate module index file from a list of files */
export default (destination: string, folders: string[]) => {
  return new Promise<void>((resolve, reject) => {
    const { config } = useConfig()

    const indexFile = path.join(destination, config.isTypescript ? 'index.ts' : 'index.js')

    let content = ''

    if (!folders.length)
      content = `export { }`

    for (const folder of folders)
      content += `export * from './${folder}'\n`

    writeFile(indexFile, content, (err) => {
      if (err)
        reject(err)
      resolve()
    })
  })
}

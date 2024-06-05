import { writeFile } from 'node:fs'
import path from 'node:path'

/** Generate module index file from a list of files */
export default (destination: string, folders: string[], typescript: boolean = false) => {
  return new Promise<void>((resolve, reject) => {
    const indexFile = path.join(destination, typescript ? 'index.ts' : 'index.js')

    let content = ''
    for (const folder of folders)
      content += `export * from './${folder}'\n`

    writeFile(indexFile, content, (err) => {
      if (err)
        reject(err)
      resolve()
    })
  })
}

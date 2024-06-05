import { writeFile } from 'node:fs'
import path from 'node:path'

/** Generate module index file from a list of files */
export default (destination: string, files: string[]) => {
  return new Promise<void>((resolve, reject) => {
    const indexFile = path.join(destination, 'index.ts')

    if (!files.length) {
      writeFile(indexFile, 'export default { }', (err) => {
        if (err)
          reject(err)
        resolve()
      })
      return
    }

    let content = ''

    files.forEach((file) => {
      content += `import ${file.split('.')[0]} from './${file}'\n`
    })

    content += `\nexport default { ${files.map(file => file.split('.')[0]).join(', ')} }\n`

    writeFile(indexFile, content, (err) => {
      if (err)
        reject(err)
      resolve()
    })
  })
}

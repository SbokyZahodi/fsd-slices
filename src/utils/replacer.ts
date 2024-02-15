import { promises as fsPromises } from 'node:fs'

export default async (filePath: string, name: string, include: string[]) => {
  const data = await fsPromises.readFile(filePath, 'utf-8')
  const changedName = data.replaceAll('recode(name)', name)
  const withExport = changedName.replaceAll('recode(export)', include.map(x => `export * from './${x}'`).join('\n'))

  await fsPromises.writeFile(filePath, withExport, 'utf-8')
}

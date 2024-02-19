import { promises as fsPromises } from 'node:fs'
import toCamelCase from './toCamelCase'

export default async (filePath: string, name: string, include: string[]) => {
  const data = await fsPromises.readFile(filePath, 'utf-8')
  const fileWithReplacedVariable = data.replaceAll('recode(name)', toCamelCase(name))
  const withExport = fileWithReplacedVariable.replaceAll('recode(export)', include.map(x => `export * from './${x}'`).join('\n'))

  await fsPromises.writeFile(filePath, withExport, 'utf-8')
}

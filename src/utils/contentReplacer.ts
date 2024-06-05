import { promises as fsPromises } from 'node:fs'
import toCamelCase from './toCamelCase'

export default async (filePath: string, name: string, typescript: boolean = false) => {
  const data = await fsPromises.readFile(filePath, 'utf-8')

  const withReplacedName = data.replaceAll('slice', toCamelCase(name))
  let withReplacedExtension = withReplacedName

  if (typescript)
    withReplacedExtension = withReplacedExtension.replaceAll('.js', '.ts')
  else
    withReplacedExtension = withReplacedExtension.replaceAll('.ts', '.js')

  await fsPromises.writeFile(filePath, withReplacedExtension, 'utf-8')
}

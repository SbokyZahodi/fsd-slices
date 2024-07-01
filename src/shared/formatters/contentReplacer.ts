import { promises as fsPromises } from 'node:fs'
import toCamelCase from '../../utils/../shared/formatters/toCamelCase'
import useConfig from '../config/useConfig'

export default async (filePath: string, name: string) => {
  const data = await fsPromises.readFile(filePath, 'utf-8')

  const { config } = useConfig()

  const withReplacedName = data.replaceAll('slice', toCamelCase(name))
  let withReplacedExtension = withReplacedName

  if (config.isTypescript)
    withReplacedExtension = withReplacedExtension.replaceAll('.js', '.ts')
  else
    withReplacedExtension = withReplacedExtension.replaceAll('.ts', '.js')

  await fsPromises.writeFile(filePath, withReplacedExtension, 'utf-8')
}

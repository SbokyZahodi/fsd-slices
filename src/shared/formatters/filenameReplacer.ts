import toCamelCase from '../formatters/toCamelCase'
import useConfig from '../config/useConfig'

export default (name: string, sliceName: string) => {
  const { config } = useConfig()

  const path = name.replace('[name]', toCamelCase(sliceName))

  if (config.isTypescript)
    return path.replace('.js', '.ts')
  if (!config.isConfigurable)
    return path.replace('.ts', '.js')

  return path
}

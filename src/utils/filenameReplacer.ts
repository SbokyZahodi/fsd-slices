import toCamelCase from './toCamelCase'

export default (name: string, sliceName: string, typescript: boolean = false) => {
  const path = name.replace('[name]', toCamelCase(sliceName))

  if (typescript)
    return path.replace('.js', '.ts')
  if (!typescript)
    return path.replace('.ts', '.js')

  return path
}

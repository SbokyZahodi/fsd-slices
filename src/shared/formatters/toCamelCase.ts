export default function toCamelCase(str: string) {
  if (!str.match(/[-_.]/) && str === str.charAt(0).toUpperCase() + str.slice(1))
    return str

  return str
    .split(/[-_.]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

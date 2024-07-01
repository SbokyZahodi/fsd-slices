import path from 'node:path'
import type { IContext } from '../../registerCommand'

export enum ITemplates {
  react = 'react',
  vue = 'vue',
  svelte = 'svelte',
  minimal = 'minimal',
}

export default (context: IContext) => {
  return path.join(context.extension.extensionPath, '_templates', context.config.template)
}

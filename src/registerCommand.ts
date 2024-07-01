import type { Disposable, ExtensionContext, Uri } from 'vscode'
import { commands } from 'vscode'
import type { IConfig } from './shared/config/useConfig'
import useConfig from './shared/config/useConfig'

export interface IContext {
  extension: ExtensionContext
  uri: Uri
  config: IConfig
  selectedFiles: Uri[]
}

const { config } = useConfig()

export default (commandName: string, command: (...args: any) => any, context: ExtensionContext): Disposable => {
  return commands.registerCommand(`extension.${commandName}`, async (currentFile: Uri, selectedFiles: Uri[]) => await command({ extension: context, uri: currentFile, config, selectedFiles }))
}

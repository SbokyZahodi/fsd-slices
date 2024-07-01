import { workspace } from 'vscode'

export interface IConfig {
  template: string
  isConfigurable: boolean
  isTypescript: boolean
  foldersToExclude: string[]
}

const workspaceConfig = workspace.getConfiguration('fsd-slices')

const config: IConfig = {
  template: workspaceConfig.get<string>('template') as string,
  isConfigurable: workspaceConfig.get<boolean>('configurable') as boolean,
  isTypescript: workspaceConfig.get<boolean>('typescript') as boolean,
  foldersToExclude: workspaceConfig.get<string>('exclude')?.split(',') ?? [],
}

export default () => {
  return {
    config,
  }
}

import path from 'node:path'
import type { ExtensionContext, QuickPickItem, Uri } from 'vscode'
import { commands, window, workspace } from 'vscode'
import { recode } from './recode'

function generateSlice(name: string, context: ExtensionContext) {
  return commands.registerCommand(`extension.${name}`, async (uri: Uri) => {
    const config = workspace.getConfiguration('fsd-slices')

    const template = config.get<string>('template') as string
    const isConfigurable = config.get<boolean>('configurable') as boolean
    const includedFolders = config.get<string>('includes') as string
    const isTypescript = config.get<boolean>('typescript') as boolean

    const sliceName = await window.showInputBox({
      prompt: 'Enter slice name',
    })

    if (!sliceName) {
      window.showErrorMessage('Please enter a slice name')
      return
    }

    const source = path.join(context.extensionPath, '_templates', template)
    const destination = path.join(uri.fsPath, sliceName)

    await recode(source, destination, sliceName, await getExcludeFoldersList(isConfigurable, includedFolders.split(', ')), isTypescript)

    window.showInformationMessage('Slice generated!')
  })
}

async function getExcludeFoldersList(isConfigurable: boolean = false, includedFolders: string[] = []) {
  const options: QuickPickItem[] = [
    { label: 'api', picked: true },
    { label: 'model', picked: true },
    { label: 'ui', picked: true },
    { label: 'config', picked: false },
  ]

  const base = ['api', 'model', 'ui', 'config']

  if (!isConfigurable)
    return includedFolders?.length ? includedFolders : base

  const foldersToInclude = await window.showQuickPick(options, {
    canPickMany: true,
    placeHolder: 'What folders to include?',
  })
  return foldersToInclude?.map(item => item.label) ?? base
}

export async function activate(context: ExtensionContext) {
  const slice = generateSlice('GenerateSlice', context)

  context.subscriptions.push(slice)
}

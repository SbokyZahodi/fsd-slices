import path from 'node:path'
import type { ExtensionContext, QuickPickItem, Uri } from 'vscode'
import { commands, window, workspace } from 'vscode'
import { recode } from './recode'

function registerCommand(name: string, context: ExtensionContext) {
  return commands.registerCommand(`extension.${name}`, async (uri: Uri) => {
    const template = workspace.getConfiguration('fsd-slices').get<string>('template') as string
    const configurable = workspace.getConfiguration('fsd-slices').get<boolean>('configurable')
    const isCustom = workspace.getConfiguration('fsd-slices').get<boolean>('custom')
    const includedFolders = workspace.getConfiguration('fsd-slices').get<string>('includes')?.split(', ')
    const isTypescript = workspace.getConfiguration('fsd-slices').get<boolean>('typescript') as boolean

    const options: QuickPickItem[] = [
      { label: 'api', picked: true },
      { label: 'model', picked: true },
      { label: 'ui', picked: true },
      { label: 'config', picked: false },
    ]

    const response = await window.showInputBox({
      prompt: 'Enter filename',
    })

    async function getExcludeFolders() {
      const base = ['api', 'model', 'ui', 'config']

      if (isCustom)
        return base

      if (configurable) {
        const response = await window.showQuickPick(options, {
          canPickMany: true, //
          placeHolder: 'Select folders to include in the generation',
        })
        return response?.map(item => item.label) ?? base
      }
      else {
        return includedFolders?.length ? includedFolders : base
      }
    }

    if (!response) {
      window.showErrorMessage('Please enter a filename')
      return
    }

    if (isCustom) {
      const root = workspace.getWorkspaceFolder(uri)?.uri.fsPath as string

      if (!root) {
        window.showErrorMessage('Workspace not found')
        return
      }

      const from = path.join(root, '_slice')
      const to = path.join(uri.fsPath, response)

      await recode(from, to, response, await getExcludeFolders())
    }
    else {
      const from = path.join(context.extensionPath, '_recode', template)
      const to = path.join(uri.fsPath, response)

      await recode(from, to, response, await getExcludeFolders(), isTypescript)
    }

    window.showInformationMessage('Slice generated')
  })
}

export async function activate(context: ExtensionContext) {
  const slice = registerCommand('GenerateSlice', context)

  context.subscriptions.push(slice)
}

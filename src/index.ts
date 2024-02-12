import type { ExtensionContext, Uri } from 'vscode'
import { commands, window, workspace } from 'vscode'
import { recode } from './recode'

function registerCommand(name: string, context: ExtensionContext) {
  return commands.registerCommand(`extension.${name}`, async (uri: Uri) => {
    const template = workspace.getConfiguration('fsd-files').get<string>('template')

    const response = await window.showInputBox({
      prompt: 'Enter filename',
    })

    const regex = /^[a-zA-Z]+$/

    if (!response) {
      window.showErrorMessage('Please enter a filename')
      return
    }

    if (!regex.test(response)) {
      window.showErrorMessage('Please enter a valid filename')
      return
    }

    const root = workspace.workspaceFolders[0]?.uri.fsPath

    if (template === 'custom')
      await recode(`${root}/_slice`, `${uri.fsPath}/${response}`, response)

    else
      await recode(`${context.extensionPath}/_recode/${template}`, `${uri.fsPath}/${response}`, response)

    window.showWarningMessage('File created successfully!')
  })
}

export async function activate(context: ExtensionContext) {
  const slice = registerCommand('GenerateSlice', context)

  context.subscriptions.push(slice)
}

export function deactivate() {

}

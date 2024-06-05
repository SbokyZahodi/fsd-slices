import { existsSync } from 'node:fs'
import path from 'node:path'
import type { ExtensionContext, Uri } from 'vscode'
import { commands, window, workspace } from 'vscode'
import { recode } from './recode'
import foldersList from './utils/foldersList'

const config = workspace.getConfiguration('fsd-slices')

const options = {
  template: config.get<string>('template') as string,
  isConfigurable: config.get<boolean>('configurable') as boolean,
  isTypescript: config.get<boolean>('typescript') as boolean,
  foldersToExclude: config.get<string>('exclude')?.split(',') ?? [],
}

function generateSlice(name: string, context: ExtensionContext) {
  return commands.registerCommand(`extension.${name}`, async (uri: Uri) => {
    const sliceName = await window.showInputBox({
      prompt: 'Enter slice name',
    })

    const customSlicePath = path.join((workspace.getWorkspaceFolder(uri)?.uri.fsPath ?? ''), '_slice')

    const { template, foldersToExclude, isConfigurable, isTypescript } = options

    if (!sliceName) {
      window.showErrorMessage('Please enter a slice name')
      return
    }

    const destination = path.join(uri.fsPath, sliceName)

    // Custom
    if (existsSync(customSlicePath)) {
      await recode({
        source: customSlicePath,
        target: destination,
        sliceName,
        exclude: await getExcludeFoldersList(isConfigurable, foldersToExclude, customSlicePath),
        typescript: isTypescript,
        root: true,
      })
    }
    // Default
    else {
      const source = path.join(context.extensionPath, '_templates', template)

      await recode({
        source,
        target: destination,
        sliceName,
        exclude: await getExcludeFoldersList(isConfigurable, foldersToExclude, source),
        typescript: isTypescript,
        root: true,
      })
    }

    window.showInformationMessage('Slice generated!')
  })
}

async function getExcludeFoldersList(isConfigurable: boolean = false, foldersToExclude: string[] = [], path: string) {
  if (!isConfigurable)
    return foldersToExclude

  const availableFolders = await foldersList(path)
  const options = availableFolders.map(dirName => ({ label: dirName, picked: !foldersToExclude.includes(dirName) }))

  const picked = await window.showQuickPick(options, {
    canPickMany: true,
    placeHolder: 'What modules to include?',
  })

  const includedFolders = picked?.map(item => item.label) ?? []
  const excludedFolders = availableFolders.filter(folder => !includedFolders.includes(folder))
  return excludedFolders
}

export async function activate(context: ExtensionContext) {
  const slice = generateSlice('GenerateSlice', context)

  context.subscriptions.push(slice)
}

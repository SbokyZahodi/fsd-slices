import { window } from 'vscode'
import useConfig from '../config/useConfig'
import foldersList from './foldersList'

export default async function getExcludeFoldersList(path: string) {
  const { config } = useConfig()

  if (!config.isConfigurable)
    return config.foldersToExclude

  const availableFolders = await foldersList(path)
  const options = availableFolders.map(dirName => ({ label: dirName, picked: !config.foldersToExclude.includes(dirName) }))

  const picked = await window.showQuickPick(options, {
    canPickMany: true,
    placeHolder: 'What modules to include?',
  })

  const includedFolders = picked?.map(item => item.label) ?? []
  const excludedFolders = availableFolders.filter(folder => !includedFolders.includes(folder))
  return excludedFolders
}

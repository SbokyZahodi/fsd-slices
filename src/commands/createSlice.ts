import path from 'node:path'
import { existsSync } from 'node:fs'
import { window, workspace } from 'vscode'
import type { IContext } from '../registerCommand'
import { recode } from '../shared/fs/recode'
import templatePath from '../shared/fs/templatePath'

/** Generates slice */
export default async (context: IContext) => {
  const sliceName = await window.showInputBox({
    prompt: 'Enter slice name',
  })

  if (!sliceName) {
    window.showErrorMessage('Please enter a slice name')
    return
  }

  const destination = path.join(context.uri.fsPath, sliceName)

  const templateSrc = templatePath(context)
  const customSliceSrc = path.join((workspace.getWorkspaceFolder(context.uri)?.uri.fsPath ?? ''), '_slice')

  await recode({
    source: existsSync(customSliceSrc) ? customSliceSrc : templateSrc,
    target: destination,
    sliceName,
    root: true,
    context,
  })

  window.showInformationMessage('Slice generated!')
}

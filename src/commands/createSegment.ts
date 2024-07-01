import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { window } from 'vscode'
import type { IContext } from '../registerCommand'
import createModule from '../shared/fs/createModule'

/** Generate module with index file */
export default async (context: IContext) => {
  const segmentName = await window.showInputBox({
    prompt: 'Enter segment name',
  })

  if (!segmentName) {
    window.showErrorMessage('Please enter a segment name')
    return
  }

  if (existsSync(path.join(context.uri.fsPath, segmentName))) {
    window.showErrorMessage('Segment already exists')
    return
  }

  const segmentPath = path.join(context.uri.fsPath, segmentName)

  await mkdir(segmentPath)

  await createModule(segmentPath, [])
}

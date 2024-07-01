import type { ExtensionContext } from 'vscode'
import segmentCommand from './commands/createSegment'
import sliceCommand from './commands/createSlice'
import registerCommand from './registerCommand'

export async function activate(context: ExtensionContext) {
  const createSliceCommand = registerCommand('GenerateSlice', sliceCommand, context)
  const createSegmentCommand = registerCommand('GenerateSegment', segmentCommand, context)

  context.subscriptions.push(createSliceCommand)
  context.subscriptions.push(createSegmentCommand)
}

'use strict'

import { app, dialog } from 'electron'
import * as path from 'path'
import { main as storexHubMain } from '@worldbrain/storex-hub/lib/main'
import { StorexHubTray } from './tray'
import { Application } from '@worldbrain/storex-hub/lib/application'
import { getPluginInfo } from '@worldbrain/storex-hub/lib/plugins/utils'

// const isDevelopment = process.env.NODE_ENV !== 'production'

declare const __static: string
let tray: StorexHubTray

export async function main() {
  const { application } = await storexHubMain()
  tray = new StorexHubTray({
    onQuit: () => app.quit(),
    onInstallPlugin: () => promptPluginInstall(application)
  })
  const iconPath = path.join(__static, process.platform === 'win32' ? 'worldbrain-logo-narrow.ico' : 'worldbrain-logo-narrow.png');
  app.on('ready', () => {
    tray.setup({ iconPath })
  })
}

async function promptPluginInstall(application: Application) {
  const directories = await dialog.showOpenDialogSync({
    properties: ['openDirectory'],
  })
  if (!directories?.length) {
    return
  }

  const maybePluginInfo = await getPluginInfo(directories[0])
  if (maybePluginInfo.status !== 'success') {
    return
  }
  // const pluginInfo = maybePluginInfo.pluginInfo

  // return application.pluginManager.installPlugin(pluginInfo, { location: directories[0] })
}

main()

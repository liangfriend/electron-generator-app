import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'


import createWindow from './initialize/createWindow'

import { createContainer } from 'awilix'
import register from './initialize/register'
import { migrate } from './initialize/migration'




app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  
  createWindow()
  // 初始化容器
  const container = createContainer()
  register(container)

  //数据库迁移
  migrate()
  app.on('activate', function () {
      //在 macOS 上，当应用程序已启动但所有窗口都已关闭时，允许用户通过点击应用程序图标来重新打开一个新窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


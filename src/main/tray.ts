import { Tray, Menu } from "electron"

export class StorexHubTray {
    tray?: Tray

    constructor(private options: {
        onQuit: () => void
        onInstallPlugin: () => void
    }) { }

    async setup(options: { iconPath: string }) {
        this.tray = new Tray(options.iconPath)
        const contextMenu = Menu.buildFromTemplate([
            { label: 'Install plugin', click: this.options.onInstallPlugin },
            { type: 'separator' },
            { label: 'Quit', click: this.options.onQuit },
        ])
        this.tray.setToolTip('Storex Hub')
        this.tray.setContextMenu(contextMenu)
    }
}

import { BrowserWindow } from "electron"

const windowMap = new Map()
export function setWindow(name, window:BrowserWindow) {
    windowMap.set(name,window)
}
export function getWindow(name) {
    return windowMap.get(name)
}
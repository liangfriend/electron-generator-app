import { BrowserWindow } from "electron";
const winMap=new Map()
export function setWindow(winName,win:BrowserWindow){
    winMap.set(winName,win)
}
export function getWindow(winName){
    return winMap.get(winName)
}
import { ipcRenderer } from "electron"

const systemApi = {
    getPath:  (): Promise<boolean> => {
      return  ipcRenderer.invoke('getPath')
  },
  getFileContent:  (): Promise<boolean> => {
      return  ipcRenderer.invoke('getFileContent')
  },

  
}
export default systemApi
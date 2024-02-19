import { ipcRenderer } from "electron"

const systemApi = {
    getPath: async (): Promise<boolean> => {
      return await ipcRenderer.invoke('getPath')
    },

  
}
export default systemApi
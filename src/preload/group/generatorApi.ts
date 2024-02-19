import { ipcRenderer } from "electron"

const generatorApi = {
  generatorStart: async (data): Promise<boolean> => {
      
      return await ipcRenderer.invoke('generatorStart',data)
    },

  
}
export default generatorApi
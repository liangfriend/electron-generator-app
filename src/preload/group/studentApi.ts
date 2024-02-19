import { ipcRenderer } from "electron"

const studentApi = {
    createStudent: async (data): Promise<boolean> => {
      return await ipcRenderer.invoke('createStudent',data)
    },
    getAllStudents: async (data): Promise<Array<object>> => {
      return await ipcRenderer.invoke('getAllStudents',data)
    },
    getStudentById: async (id): Promise<boolean> => {
      return await ipcRenderer.invoke('getStudentById',id)
    },
    updateStudentById: async (id,data): Promise<boolean> => {
      return await ipcRenderer.invoke('updateStudentById',id,data)
    },
    deleteStudentById: async (id): Promise<boolean> => {
      return await ipcRenderer.invoke('deleteStudentById',id)
    },
  
}
export default studentApi
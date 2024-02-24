import { ipcMain } from "electron";

class StudentController {
    studentService
    constructor(data:any) {
        this.studentService = data.studentService;
        this.init();
    }

    init() {
        
        this.createStudent();
        this.getAllStudents();
        this.getStudentById();
        this.updateStudentById();
        this.deleteStudentById();
    }

    createStudent() {

        ipcMain.handle("createStudent", async (event,data) => {
            try {
                const student = await this.studentService.createStudent(data);
                return student;
            } catch (error) {
                console.error("Error creating student:", error);
                throw error;
            }
        });
    }

    getAllStudents() {
       
        ipcMain.handle("getAllStudents", async (event,data) => {
            try {
                const students = await this.studentService.getAllStudents(data);
                return students;
            } catch (error) {
                console.error("Error getting all students:", error);
                throw error;
            }
        });
    }

    getStudentById() {
        ipcMain.handle("getStudentById", async (event, id) => {
            try {
                const student = await this.studentService.getStudentById(id);
                return student;
            } catch (error) {
                console.error(`Error getting student with id ${id}:`, error);
                throw error;
            }
        });
    }

    updateStudentById() {
        ipcMain.handle("updateStudentById", async (event, id, data) => {
            console.log("进入，",id,data)
            try {
                const updatedStudent = await this.studentService.updateStudentById(id, data);
                return updatedStudent;
            } catch (error) {
                console.error(`Error updating student with id ${id}:`, error);
                throw error;
            }
        });
    }

    deleteStudentById() {
        ipcMain.handle("deleteStudentById", async (event, id) => {
            try {
                const isDeleted = await this.studentService.deleteStudentById(id);
                return isDeleted;
            } catch (error) {
                console.error(`Error deleting student with id ${id}:`, error);
                throw error;
            }
        });
    }
}

export default StudentController;

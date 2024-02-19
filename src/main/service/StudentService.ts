class StudentService {
    studentRepository
    constructor(data) {
        this.studentRepository = data.studentRepository;
    }

    async createStudent(data) {
        try {
            const student = await this.studentRepository.createStudent(data);
            return student;
        } catch (error) {
            console.error('Error creating student:', error);
            throw error;
        }
    }

    async getAllStudents(data) {
        try {
            const students = await this.studentRepository.getAllStudents(data);
            return students;
        } catch (error) {
            console.error('Error getting all students:', error);
            throw error;
        }
    }

    async getStudentById(id) {
        try {
            const student = await this.studentRepository.getStudentById(id);
            return student;
        } catch (error) {
            console.error(`Error getting student with id ${id}:`, error);
            throw error;
        }
    }

    async updateStudentById(id, data) {
        try {
            const updatedStudent = await this.studentRepository.updateStudentById(id,data);
            return updatedStudent;
        } catch (error) {
            console.error(`Error updating student with id ${id}:`, error);
            throw error;
        }
    }

    async deleteStudentById(id) {
        try {
            const isDeleted = await this.studentRepository.deleteStudentById(id);
            return isDeleted;
        } catch (error) {
            console.error(`Error deleting student with id ${id}:`, error);
            throw error;
        }
    }
}

export default StudentService;

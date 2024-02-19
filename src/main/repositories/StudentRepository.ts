import { Op } from "sequelize";
import { queryData } from "../utils/query";

class StudentRepository {
    studentModel
    constructor(data) {
        this.studentModel = data.studentModel;
    }

    async createStudent(data) {
        try {
            const student = await this.studentModel.create(data);
            return student;
        } catch (error) {
            console.error('Error creating student:', error);
            throw error;
        }
    }

    async getAllStudents(data) {
        try {
            const queries = queryData(data)
              console.log(222,queries)
            const students = await this.studentModel.findAll( queries );
            const total = await this.studentModel.count(queries);
            return { data: students.map(e => e.get({ plain: true })) ,total};
        } catch (error) {
            console.error('Error getting all students:', error);
            throw error;
        }
    }

    async getStudentById(id) {
        try {
            const student = await this.studentModel.findByPk(id);
            return student;
        } catch (error) {
            console.error(`Error getting student with id ${id}:`, error);
            throw error;
        }
    }

    async updateStudentById(id, data) {
        try {
            const res = await this.studentModel.update(
                data,
                { where: { id }, returning: true }
            );

            return res
        } catch (error) {
            console.error(`Error updating student with id ${id}:`, error);
            throw error;
        }
    }

    async deleteStudentById(id) {
        try {
            const rowsDeleted = await this.studentModel.destroy({ where: { id } });
            return rowsDeleted > 0;
        } catch (error) {
            console.error(`Error deleting student with id ${id}:`, error);
            throw error;
        }
    }
}

export default StudentRepository;

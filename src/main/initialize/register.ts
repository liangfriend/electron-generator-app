import { AwilixContainer, asClass, asValue, createContainer } from "awilix";
import { Sequelize } from "sequelize";
import TestController from "../controller/TestController";
import TestService from "../service/TestService";
import sequelize from "./sequelize";
import StudentController from "../controller/StudentController";
import StudentRepository from "../repositories/StudentRepository";
import StudentService from "../service/StudentService";
import StudentModel from "../models/StudentModel";
import SystemController from "../controller/SystemController";
import SystemRepository from "../repositories/SystemRepository";
import SystemService from "../service/SystemService";
import GeneratorService from "../service/GeneratorService";
import GeneratorController from "../controller/GeneratorController";
import GeneratorRepository from "../repositories/GeneratorRepository";


function register(container: AwilixContainer) {
   
 
    container.register({
        sequelize: asValue(sequelize),
        testController: asClass(TestController),
        testService: asClass(TestService),
        studentController: asClass(StudentController),
        studentService: asClass(StudentService),
        studentRepository: asClass(StudentRepository),
        studentModel: asValue(StudentModel),
        systemController: asClass(SystemController),
        systemService: asClass(SystemService),
        systemRepository: asClass(SystemRepository),
        generatorController: asClass(GeneratorController),
        generatorService: asClass(GeneratorService),
        generatorRepository: asClass(GeneratorRepository),
     
        
    })
    // container.resolve("testController")
    container.resolve("studentController")
    container.resolve("generatorController")
    container.resolve("systemController")
}



export default  register
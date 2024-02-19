import { createFile } from "@/main/utils/common"


export default function generator(config) {
    
    //
    const content = source(config)
    const fileName = 'register.ts'
    const generatorPath = config.targetPath + config.name + '/src/main/initialize/'
    createFile(fileName,content,generatorPath)

}
function dynamicImport(config){
    let result = ''
    const data = config.data
    data.forEach(item => {
        const Key = item.Key
        const key=item.key
        const str = 
        `
        import ${Key}Controller from "../controller/${key}Controller";
        import ${Key}Repository from "../repositories/${key}Repository";
        import ${Key}Service from "../service/${key}Service";
        import ${Key}Model from "../models/${key}Model";\n
        `
        result=result+str
    })
    return result
}
function dynamicRegister(config){
    let result = ''
    const data = config.data
    data.forEach(item => {
        const Key = item.Key
        const key=item.key
        const str = 
        `
        ${key}Controller: asClass(${Key}Controller),
        ${key}Service: asClass(${Key}Service),
        ${key}Repository: asClass(${Key}Repository),
        ${key}Model: asValue(${Key}Model),\n
        `
        result=result+str
    })
    return result
}
function dynamicResolve(config){
    let result = ''
    const data = config.data
    data.forEach(item => {
        const Key = item.Key
        const key=item.key
        const str = 
        `
        container.resolve("${key}Controller")\n
        `
        result=result+str
    })
    return result
}
function source(config) {
    console.log("registerImport",config)
         const source = {
             template:
`import { AwilixContainer, asClass, asValue, createContainer } from "awilix";
import { Sequelize } from "sequelize";
import sequelize from "./sequelize";
${dynamicImport(config)}


function register(container: AwilixContainer) {
   
 
    container.register({
        sequelize: asValue(sequelize),
        ${dynamicRegister(config)}
     
        
    })

    ${dynamicResolve(config)}
}

export default  register
`
        }
        return source.template
    }
//这个是虚拟的，真实操作是得到这个数据后直接传入generator-start执行
export const config = {
    name:"测试生成项目",
    targetPath: 'C:/Users/22173/Desktop/test',
    mainTemplateType:'default',
    perloadTemplateType:'default',
    data: [
        {
            rendererTemplateType:'default',
            key: "student",
            Key: "Student",
            name: "学生管理",
            column: [
                {
                    name: 'id',
                    primaryKey: true,
                    type:"INTEGER"
                },
                {
                    name: "lastName",
                    type:"TEXT"
                    
                },
                {
                    name: "firstName",
                    type:"TEXT"
                    
                }
            ]
        }
    ]
}
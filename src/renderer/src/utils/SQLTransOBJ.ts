const source=`

create table equipment_info
(
    id              INTEGER
        primary key autoincrement,
    serial_no       TEXT not null
        unique,
    mac             TEXT,
    equipment_model TEXT,
    code_name       TEXT,
    equipment_type  TEXT,
    ctime           INTEGER
);

create table equipment_patient_bind
(
    id         INTEGER
        primary key autoincrement,
    serial_no  TEXT,
    patient_id TEXT,
    is_bind    INTEGER,
    timestamp  INTEGER
);

create table equipment_patient_relationship
(
    id         INTEGER
        primary key autoincrement,
    serial_no  TEXT
        unique,
    patient_id TEXT,
    timestamp  INTEGER
);
`
type generatorConfigData=any[]
type generatorConfig={data:generatorConfigData}
export function SQLTransOBJ(data: string): generatorConfigData | null {
    const regex = /\b\w+\b|,|\(|\)/g;

    const matches:string[] | null = data.match(regex);
   
    if (!matches) {
        return null;
    }
    const result: generatorConfigData = []

    matches.reduce((pre, cur, i, arr) => {
     
        if (pre === "table") {
            console.log("进入")
            result.push({
                key: underscoreToCamelCase(cur),
                Key: underscoreToCamelCase(cur).charAt(0).toUpperCase() + underscoreToCamelCase(cur).slice(1),
                name: underscoreToCamelCase(cur),
                viewIndexTemplateType: 'default',
                column:[]
            })
        }
        if (result.length === 0) {
            return cur
        }
        const currentData = result[result.length - 1]
        if (pre === ',' || pre === '(') {
            currentData.column.push({
                name: cur,
                primaryKey: arr[i+2]==="primary",
                allowNull: arr[i+2]!=="primary",
                type:arr[i+1]
            })
        }
        if (currentData.column.length === 0) {
            return cur
        }
        const currentColumn = currentData.column[currentData.column.length - 1]
        
        return cur
    });
    return result
}

const result = SQLTransOBJ(source)
console.log(result)
//下划线转驼峰
function underscoreToCamelCase(str:string) {
    return str.replace(/_([a-z])/g, function (_match:string, group1:string) {
        return group1.toUpperCase();
    });
}
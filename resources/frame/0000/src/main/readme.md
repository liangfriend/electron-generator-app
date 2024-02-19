# 基础增删改查命名规范
## 例：student表
## 增加（Create）：
### 单个学生的增加：createStudent(data: StudentData): Promise<Student>
### 多个学生的增加：createStudents(data: StudentData[]): Promise<Student[]>
## 查询（Retrieve）：

### 查询单个学生：getStudentById(id: number): Promise<Student | null>
### 查询所有学生：getAllStudents(data: Partial<StudentData>): Promise<Student[]>
## 更新（Update）：

### 更新单个学生信息：updateStudentById(id: number, data: Partial<StudentData>): Promise<boolean>
### 批量更新学生信息：updateStudentsByIds(ids: number[], data: Partial<StudentData>): Promise<boolean>
## 删除（Delete）：

### 删除单个学生：deleteStudentById(id: number): Promise<boolean>
### 批量删除学生：deleteStudentsByIds(ids: number[]): Promise<boolean>
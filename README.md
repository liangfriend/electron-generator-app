## 简介
通过配置，一键生成electron桌面应用

## 介绍
基于electron的windows系统应用生成器。
对于单个开发者而言，只需掌握基础web开发知识配合此生成器就可以独自完成桌面软件的开发。完全不用考虑工程架构方面的问题。
对于多人团队而言，提供了统一规范，包括函数流通逻辑规范、命名逻辑规范、统一工具函数（比如日志打印log.ts）规范，避免出现千人千面现象。
目的：摒弃重复代码，提升开发效率，大量重复的例如风格统一的前端页面，通过一次配置实现代代传承。

## 特性
1. 暴露五个别名，用来满足全局文件的引入

| 别名       | 路径                            |
| ---------- | ------------------------------- |
| @          | 指向工程最外层                  |
| @main      | 指向main/                       |
| @resources | 指向工程最外层的resources文件夹 |
| @static    | 指向renderer中assets文件夹      |
| @renderer  | 指向renderer/src/               |

2. 生成统一的函数流通逻辑和数据迁移逻辑，开发者只需照葫芦画瓢的来实现新需求
3. 生成器在设计时保留了可扩充性，所有的模板都在实现上使用了Map，甚至工程本身也做成了Map，所以通过现有逻辑的扩充即可模板定制需求。
4. 内置模块，在main层定义了utils文件夹，内置了log、window等工具函数，避免每一代开发者千人千面的恶心行为


## 使用

1. 拉取代码
2. npm i(如果失败，尝试去掉package.json中的sqlite3依赖，重新install 然后单独执行npm install sqlite3@5.1.7)
3. 执行   npm run dev   启动项目
4. 打开的项目可以直接点击生成按钮，弹出路径选择器，选择一个路径，就会在此路径生成项目
5. 打开生成项目，执行1，2，3步启动项目，就可以看到生成的项目了
6. 以上就是使用方法，可以通过配置生成自己想要的electron项目，也可以开发新的定制模板选项（代码逻辑已经预留了模板配置）。

## 附录
### 条件查询
可以看到生成的函数的条件查询是这样的,并没有条件查询的实现
window.api.getAllUsers({offset:offset.value,limit:limit.value})
但是实际在repository这一层对传入的函数做了处理，内置实现了lte,gte,lt,gt,contains,orderby,limit.offset,eq的逻辑，使用方法如下
window.api.getAllUsers({name_contains:'%梁%',age_lt:5})
程序是通过“_”这个关键符号来区分字段名和操作符的



### 注意事项

当前生成器只有一个模板0000，并且0000模板以及生成器本身的源码，在ts方面都及其宽松，没有返回值检查，没有参数检查。如有需要，开发者自行修改配置文件使工程严格化
// deepCopyPlugin.js

// 定义深拷贝函数
export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 定义插件
export const deepCopyPlugin = {
    install(app) {
        // 在 Vue 实例的全局属性上添加 $deepCopy 方法
        app.config.globalProperties.$deepCopy = deepCopy;
    }
};

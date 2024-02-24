import { BrowserWindow, dialog } from "electron";
import fs from 'fs'
import fsExtra from 'fs-extra'
import path from "path";
// 打开文件对话框
export async function openFileDialog(win:BrowserWindow,config:{extensions?:string[]}):Promise<string> {
    const result=await dialog.showOpenDialog(win,  {
    properties: ['openFile'],
    filters: [
      { name: 'All Files', extensions: config.extensions??['*'] }
    ]
    })
    const filePath = result.filePaths[0];
    let content=''
    content= fs.readFileSync(filePath, 'utf-8');
    console.log(content)
    return content
}
// 用于文件生成
export function createFile(fileName:string, content:string, targetPath:string) {
    if (!targetPath.endsWith("/")) {
        targetPath += "/";
    }

    // 确保目标路径存在
    if (!fs.existsSync(targetPath)) {
        try {
            fs.mkdirSync(targetPath, { recursive: true }); // recursive 选项确保创建多级目录
        } catch (err) {
            console.error('创建目录时出错：', err);
            return;
        }
    }

    // 使用 path.join 方法创建文件路径
    const filePath = path.join(targetPath, fileName);

    // 使用 fs.writeFile 方法创建文件并写入内容
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('创建文件时出错：', err);
            return;
        }
        console.log(`文件 ${fileName} 创建成功！`);
    });
}
// 打开路径选择对话框
export async function openDirectoryDialog(win: BrowserWindow): Promise<string> {
    try {
        const result = await dialog.showOpenDialog(win, {
            properties: ['openDirectory']
        });
        if (!result.canceled) {
            const selectedDirectory = result.filePaths[0];
            console.log('选择的路径：', selectedDirectory);
            // 在这里可以处理选择的路径
            return selectedDirectory;
        } else {
            return ''; // 用户取消选择时返回空字符串
        }
    } catch (err) {
        console.error('打开对话框时出错：', err);
        return ''; // 出错时也返回空字符串
    }
}

//拷贝文件
export function copyFileWithProgress(source: string, target: string, progressCallback:object) {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(target);
    let totalBytesCopied = 0;
    let totalBytes:number;

    // 获取源文件的大小
    fs.stat(source, (err, stats) => {
        if (err) {
            console.error('获取文件大小时出错：', err);
            return;
        }
        totalBytes = stats.size;
    });

    // 监听数据流传输事件
    readStream.on('data', chunk => {
        // !不可以这么回调，要发送到ipcMain.on中去
        totalBytesCopied += chunk.length;
        const progress = totalBytesCopied / totalBytes;
        progressCallback(progress); // 回调函数通知拷贝进度
    });

    // 监听数据流结束事件
    readStream.on('end', () => {
        console.log('文件拷贝完成');
    });

    // 监听读取流错误事件
    readStream.on('error', err => {
        console.error('读取文件时出错：', err);
    });

    // 监听写入流错误事件
    writeStream.on('error', err => {
        console.error('写入文件时出错：', err);
    });

    // 执行文件拷贝
    readStream.pipe(writeStream);
}
/**
 * 将源目录拷贝到目标目录，并监听拷贝过程
 * @param {string} sourceDir 源目录路径
 * @param {string} targetDir 目标目录路径
 */
export async function copyDirectoryWithProgress(sourceDir:string, targetDir:string,progressCallback:object) {
    try {
        let totalFiles = 0;
        let copiedFiles = 0;

        // 获取源目录下的所有文件数量
        const sourceFiles = await fsExtra.readdir(sourceDir);
        totalFiles = sourceFiles.length;

        // 执行目录拷贝操作并监听拷贝进度
        await fsExtra.copy(sourceDir, targetDir, {
            overwrite: true,
            errorOnExist: false,
            recursive: true,
            
            // 进度回调((
            filter: (src, dest) => {
                // !不可以这么回调，要发送到ipcMain.on中去
                progressCallback(src, dest)
                console.log(`拷贝文件：${src} 到 ${dest}`);
                copiedFiles++;
                console.log(`拷贝进度：${copiedFiles} / ${totalFiles}`);
                return true;
            }
        });

        console.log('目录拷贝完成！');
    } catch (error) {
        console.error('目录拷贝出错：', error);
        throw error;
    }
}
// 示例用法
// const sourcePath = '/path/to/source/file.txt';
// const targetPath = '/path/to/target/file.txt';

// // 回调函数用于处理拷贝进度
// const progressCallback = progress => {
//     console.log(`拷贝进度：${Math.round(progress * 100)}%`);
// };
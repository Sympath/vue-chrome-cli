const { exec } = require("node:child_process");
const glob = require("glob");

/** 对exec进行一个简单的封装，返回的是一个Promise对象，便于处理。
 * @return Promise
 */
function doShellCmd(cmd) {
    let str = cmd;
    let result = {};

    return new Promise(function (resolve, reject) {
        try {
            exec(str, function (err, stdout, stderr) {
                if (err) {
                    console.log('err');
                    result.errCode = 500;
                    result.data = "操作失败！请重试";
                    result.stderr = stderr;
                    reject(result);
                } else {
                    console.log('stdout ', stdout);//标准输出
                    result.errCode = 200;
                    result.data = "操作成功！";
                    result.stdout = stdout;
                    resolve(result);
                }
            })
        } catch (error) {
            throw new Error(error)
        }

    })
}
/** 获取指定目录下所有文件的导出信息
 * 
 * @param {*} dirPath 指定目录 需要绝对路径
 * @param {*} suffix 后缀
 * @param {*} opts：方法本身的配置对象  
 *          1. removeRequireCache 是否清除require缓存，在【应用启动过程中会修改源码】的场景下执行
 *          2. needAbsPath 是否挂载文件绝对路径信息再返回
 *          3. globOpts glob的配置对象
 */
function getFileExportObjInDir(dirPath, suffix = "js", opts = {}) {
    let {
        removeRequireCache,
        needAbsPath = true,
        globOpts = {}
    } = opts
    // 利用glob实现自动引入所有命令实现
    const files = glob.sync(`${dirPath}/*.${suffix}`, {
        ...globOpts,
    });
    const controllers = {};
    files.forEach((key) => {
        const name = key.split("/").pop().replace(/\.js/g, "");
        if (removeRequireCache) {
            delete require.cache[key]
        }
        const value = require(key);
        // 挂载文件绝对路径信息
        if (needAbsPath) {
            value._absPath = key
        }
        controllers[name] = value;
    });
    return controllers;
}
module.exports = {
    doShellCmd,
    getFileExportObjInDir
}
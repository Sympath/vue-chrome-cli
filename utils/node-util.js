const { exec } = require("node:child_process");

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

module.exports = {
    doShellCmd
}
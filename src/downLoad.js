/*
 * @Date: 2019-09-29 18:01:37
 * @information: 最后更新时间
 */
// git包
const downLoad = require('download-git-repo')
// 动画
const ora = require('ora')

let clone = false
let downGit = (chooses, name) => {
    const spinner = ora('正在拉取模板...')
    spinner.start()
    return new Promise((resolve, reject) => {
        downLoad(chooses.url, name, {
            clone
        }, err => {
            spinner.stop()
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    }) 

}
module.exports = downGit
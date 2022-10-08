const spawn = require('child_process').spawn
// git包
const downLoad = require('download-git-repo')
// 动画
const ora = require('ora')

const Log = require('./log');

const log = new Log();

/**
 * Runs `npm install` in the project directory
 * @param {string} cwd Path of the created project directory
 * @param {object} data Data from questionnaire
 */
exports.installDependencies = function installDependencies(
  cwd,
  executable = 'npm'
) {
  console.log(`\n\n# ${log.success('Installing project dependencies ...')}`)
  console.log('# ========================\n')
  return runCommand(executable, ['install'], {
    cwd,
  })
}

/**
 * Spans a child process and runs the specified command
 * By default, runs in the CWD and inherits stdio
 * Options are the same as node's child_process.spawn
 * @param {string} cmd
 * @param {array<string>} args
 * @param {object} options
 */
function runCommand(cmd, args, options) {
  return new Promise((resolve, reject) => {
    const spwan = spawn(
      cmd,
      args,
      Object.assign(
        {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: true,
        },
        options
      )
    )

    spwan.on('exit', () => {
      resolve()
    })
  })
}
/** 下载github仓库
 * 
 * @param {*} url 仓库相对路径 用户名/仓库名
 * @param {*} name 下拉之后的目录名
 * @param {*} options 下拉配置
 * @returns 
 */
exports.downGit = (url, name, options = {
  clone : false
}) => {
    const spinner = ora('正在拉取模板...')
    spinner.start()
    return new Promise((resolve, reject) => {
        downLoad(url, name, options, err => {
            spinner.stop()
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    }) 

}

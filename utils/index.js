const spawn = require('child_process').spawn
// git包
const downLoad = require('download-git-repo')
// 动画
const ora = require('ora')

const Log = require('./log');

const log = new Log();
// loading + 失败重新发起fetch
async function wrapLoading(fn, message) {
  const spinner = ora(message);
  spinner.start(); // 开始加载

  try {
    let repos = await fn();
    spinner.succeed(); // 成功
    return repos;
  } catch (error) {
    spinner.fail('request failed, refetch...')
    await sleep(1000);
    console.log(error);
    return wrapLoading(fn, message);
  }
}
/**
 * Runs `npm install` in the project directory
 * @param {string} cwd Path of the created project directory
 * @param {object} data Data from questionnaire
 */
function installDependencies(
  cwd,
  executable = 'npm'
) {
  log.success('# Installing project dependencies ...')
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
function downGit(url, name, options = {
  clone: false
}) {
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
/**
 * 类型判断函数 传递一个要判断的类型 会返回一个函数 传要判断的值 返回是否属于之前的类型
 * @param {*} type 是否是此类型
 * @returns
 */
function typeCheck(type) {
  let types = [
    "Array",
    "Object",
    "Number",
    "String",
    "Undefined",
    "Boolean",
    "Function",
    "Map",
    "Null",
  ];
  let map = {};
  types.forEach((type) => {
    map[type] = function (target) {
      return Object.prototype.toString.call(target) === `[object ${type}]`;
    };
  });
  return map[type];
}
/**
 * 遍历对象 直接获取key value  （不会遍历原型链  forin会）
 * @param {*} obj 被遍历对象
 * @param {*} cb 回调
 */
function eachObj(obj, cb) {
  if (typeCheck("Map")(obj)) {
    for (let [key, value] of obj) {
      cb(key, value);
    }
  } else if (typeCheck("Object")(obj)) {
    for (const [key, value] of Object.entries(obj)) {
      cb(key, value);
    }
  } else {
    console.log("请传递对象类型");
  }
};
module.exports = {
  wrapLoading,
  installDependencies,
  runCommand,
  downGit,
  typeCheck,
  eachObj,
}
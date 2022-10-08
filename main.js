#! /usr/bin/env node

const cmd = require("commander");
const path = require("path");
const chalk = require('chalk')
const { downGit, installDependencies } = require('./utils/index')
const options = require('./src/cli')
const Log = require('./utils/log');

const log = new Log();

const cwd = process.cwd()
cmd.command('init').description('初始化模板').action(async (args) => {
    typeof args !== 'string' && (console.log(log.error('缺少必填参数')), process.exit(1))
    log.warning('vue开发chrome脚手架初始化模板 \n')
    // 填选项
    let chooses = await options()
    let chooseMap = {
        'vue2': {
            url: 'Sympath/vue-chrome-template'
        }
    }
    // 拉取
    await downGit(chooseMap[chooses.type].url, args)
    log.success('项目创建成功\n')
    try {
        await installDependencies(path.join(cwd, args), 'npm')
        log.success('依赖安装成功 请运行 npm run build 生成dist目录，然后将此目录安装进扩展目录中\n')
        log.success('安装扩展方法可见 https://juejin.cn/post/7148618712646418439\n')
        process.exit(0)
    } catch (error) {
        log.error(`依赖安装失败 具体信息：\n ${error}`)
        process.exit(1)
    }
})
cmd.parse(process.argv)
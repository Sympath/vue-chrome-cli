const path = require("path");
const { downGit, installDependencies } = require('../utils/index')
const options = require('../src/cli')
const Log = require('../utils/log');
const nodeUtil = require('../utils/node-api');
const generateManifest = require('../src/gen-manifest')
const {
    defaultKeys,
    defaultKeysMap
} = require('../config/manifest');
const log = new Log();
const cwd = process.cwd()

module.exports = {
    description: '初始化模板',
    implementation: async (args) => {
        // typeof args !== 'string' && (console.log(log.error('缺少必填参数')), process.exit(1))
        log.warning('vue开发chrome脚手架初始化模板 \n')
        // 填选项
        let chooses = await options()
        let chooseMap = {
            'vue2': {
                url: 'Sympath/vue-chrome-template'
            }
        }
        // 项目名称
        let projectName = chooses.projectName;
        // 项目路径
        let projectPath = path.join(cwd, projectName)
        try {
            // 拉取
            await downGit(chooseMap[chooses.type].url, projectName)
            log.success('项目创建成功\n')
        } catch (error) {
            log.error('项目创建失败 原因：\n', error)
        }
        try {
            // 生成对应的manifest文件
            await generateManifest(chooses, `${projectPath}/src/manifest.json`)
            // 删除对应不需要的目录
            for (let index = 0; index < defaultKeys.length; index++) {
                const name = defaultKeys[index];
                let { dir } = defaultKeysMap[name];
                if (!chooses[name]) {
                    let needRmPath = `${projectPath}/src/${dir || name}`
                    // console.log('开始删除', needRmPath);
                    await nodeUtil.doShellCmd(`rm -rf ${needRmPath}`)
                }
            }
            // 自动安装依赖
            await installDependencies(projectPath, 'npm')
            log.success('依赖安装成功 请运行如下命令进行开发 生成dist目录，然后将此目录安装进扩展目录中\n')
            log.success('安装扩展方法可见 https://juejin.cn/post/7148618712646418439\n')
            log.success(`cd ${projectName}\n`)
            log.success('npm run build-watch \n')
            process.exit(0)
        } catch (error) {
            log.error(`依赖安装失败 具体信息： \n ${error}`)
            process.exit(1)
        }
    }
}
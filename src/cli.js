/*
 * @Date: 2019-09-29 18:08:08
 * @information: 最后更新时间
 */
const inquirer = require('inquirer')
const DEFAULT_OPTIONS = {
    type: 'vue2',
    projectName: 'my-chrome-extension',
    backgroundMode: 'js',
    ui: 'elementui',
    devTool: false,
    newtab: false,
}
let questions = []
// 框架类型
questions.push({
    name: "type",
    message: "你想创建一个什么类型的模板(vue2|vue3|react|ssr)",
    default: DEFAULT_OPTIONS.type
})
// devTool
questions.push({
    name: 'devTool',
    message: '是否需要对开发者工具(devTool)做扩展开发?',
    default: DEFAULT_OPTIONS.devTool,
})
// newtab
questions.push({
    name: 'newTab',
    message: '是否需要对新标签页(newtab)做扩展开发?',
    default: DEFAULT_OPTIONS.newtab,
})
// ui
questions.push({
    name: 'ui',
    message: '采用哪个ui框架',
    default: DEFAULT_OPTIONS.ui,
})


module.exports = () => {
    return inquirer
        .prompt(questions)
}
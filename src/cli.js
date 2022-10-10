const inquirer = require('inquirer')
const {
    defaultKeys,
    defaultKeysMap
} = require('../config/manifest');
const OPTIONS = [{
    name: 'type',
    default: 'vue2',
    message: '你想创建一个什么类型的模板(vue2|vue3|react|ssr)'
}, {
    name: 'projectName',
    default: 'my-chrome-extension',
    message: '请输入你的插件名'
}, {
    name: 'ui',
    default: 'elementui',
    message: '采用哪个ui框架'
}]


defaultKeys.forEach(name => {
    let message = `是否需要开发${name} ${defaultKeysMap[name].note || ''}`;
    OPTIONS.push({
        name,
        message,
        default: true
    })
})


module.exports = () => {
    return inquirer
        .prompt(OPTIONS)
}
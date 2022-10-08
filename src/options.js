/*
 * @Date: 2019-09-29 18:08:08
 * @information: 最后更新时间
 */
const inquirer = require('inquirer')
let optionsArr = [{
    name: "type",
    message: "你想创建一个什么类型的模板(vue2|vue3|react|ssr)",
    default: 'vue2'
}
]

module.exports = () => {
    return inquirer
        .prompt(optionsArr)
}
const inquirer = require("inquirer");
const { defaultKeys, defaultKeysMap } = require("../config/manifest");
const OPTIONS = [
  {
    name: "type",
    default: "vue2",
    message: "你想创建一个什么类型的模板(vue2|vue3|react|ssr)",
  },
  {
    name: "projectName",
    default: "my-chrome-extension",
    message: "请输入你的插件名",
  },
  {
    name: "ui",
    default: "elementui",
    message: "采用哪个ui框架",
  },
];

let choices = defaultKeys.map((key, index) => {
  let name = `${key} ${defaultKeysMap[key].note || ""}`;
  return {
    name,
    value: key,
  };
});
// 默认全选中
OPTIONS.push({
  default: defaultKeys,
  type: "checkbox",
  message: "开发chrome内容",
  name: "chromeOptions",
  choices,
});

module.exports = () => {
  return inquirer.prompt(OPTIONS);
};

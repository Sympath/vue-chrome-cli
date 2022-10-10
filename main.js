#! /usr/bin/env node

const cmd = require("commander");
const commandIns = require("./commandIns");
const utils = require("./utils/index");
// 动态引入对应命令
utils.eachObj(commandIns, (key, val) => {
    let { description, implementation } = val;
    cmd.command(key).description(description).action(implementation)
});
cmd.parse(process.argv)
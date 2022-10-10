const chalk = require('chalk');

module.exports = class Log {
    constructor() {
        this.log = console.log;
    }

    error(msg) {
        if (typeof msg === 'object') {
            msg = JSON.stringify(msg)
        }
        this.log(chalk.red(msg));
    }

    warning(msg) {
        if (typeof msg === 'object') {
            msg = JSON.stringify(msg)
        }
        this.log(chalk.yellow(msg));
    }

    success(msg) {
        if (typeof msg === 'object') {
            msg = JSON.stringify(msg)
        }
        this.log(chalk.green(msg));
    }

    clearLog() {
        process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
    }
}
const defaultKeysMap = {
    background: {
        snippest:
        {
            scripts: ["js/background.js"]
        }
        ,
        note: '后台逻辑'
    },
    options_page: {
        snippest: "options.html",
        note: '选项页',
        dir: 'options',
    },
    content_scripts: {
        snippest:
            [
                {
                    matches: ["*://*/*"],
                    css: ["content-script/content-script.css"],
                    js: ["content-script/cs-init.js", "js/content-script.js"],
                    run_at: "document_end"
                }
            ]
        ,
        dir: 'content-script',
        note: '插入用户页面脚本'
    },
    chrome_url_overrides: {
        snippest: {
            "newtab": "override-page.html"
        },
        dir: 'override-page',
        note: '默认tab页'
    }
}
const defaultKeys = Object.keys(defaultKeysMap)
module.exports = {
    defaultKeys,
    defaultKeysMap
}
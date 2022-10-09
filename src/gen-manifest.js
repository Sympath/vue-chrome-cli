const fs = require("fs");
const {
    defaultKeys,
    defaultKeysMap
} = require('../config/manifest');

async function generateManifest(options, manifestPath) {
    const { version_no: version, description, name } = options;
    const manifestJson = {
        "manifest_version": 2,
        "name": name,
        "description": description || "vue开发chrome",
        "version": version || "0.0.1",
        "icons": {
            "48": "img/icon_48.png",
            "128": "img/icon_128.png"
        },
        "browser_action": {
            "default_popup": "popup.html",
            "default_icon": "img/unit.png"
        },

    };
    defaultKeys.forEach(name => {
        if (options[name] && options[name] !== 'n' && options[name] !== 'false') {
            manifestJson[name] = defaultKeysMap[name].snippest
        }
    })
    // Production build of manifest.json
    fs.writeFileSync(
        manifestPath,
        JSON.stringify(manifestJson, null, 4),
        {
            encoding: "utf-8"
        }
    );
};

module.exports = generateManifest;
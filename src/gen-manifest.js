const fs = require("fs");
const { defaultKeys, defaultKeysMap } = require("./manifest-data");

async function generateManifest(options, manifestPath) {
  const {
    version_no: version,
    description,
    projectName,
    chromeOptions,
  } = options;
  const manifestJson = {
    manifest_version: 2,
    name: projectName,
    description: description || "vue开发chrome",
    version: version || "0.0.1",
    icons: {
      48: "img/icon_48.png",
      128: "img/icon_128.png",
    },
  };
  defaultKeys.forEach((name) => {
    if (chromeOptions.includes(name)) {
      manifestJson[name] = defaultKeysMap[name].snippest;
    }
  });
  // Production build of manifest.json
  fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 4), {
    encoding: "utf-8",
  });
}

module.exports = generateManifest;

{
    "manifest_version": 2,
    "description": "vue开发chrome",
    "version": "0.0.1",
    "icons": {
        "48": "img/icon_48.png",
        "128": "img/icon_128.png"
    },
    "browser_action": {
        "default_popup": "popup.html",
        "default_icon": "img/unit.png"
    },
    "background": "\n        \"background\": {\n            \"scripts\": [\"js/background.js\"]\n        }\n        "
}
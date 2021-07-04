cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
        {
            "file": "plugins/cordova-plugin-ble-central/www/ble.js",
            "id": "cordova-plugin-ble-central.ble",
            "pluginId": "cordova-plugin-ble-central",
            "clobbers": [
                "ble"
            ]
        },
        {
            "file": "plugins/cordova-plugin-ble-central/src/browser/BLECentralPlugin.js",
            "id": "cordova-plugin-ble-central.BLECentralPlugin",
            "pluginId": "cordova-plugin-ble-central",
            "merges": [
                "ble"
            ]
        },
        {
            "file": "plugins/cordova-plugin-smartgarden/www/smartgarden.js",
            "id": "cordova-plugin-smartgarden.smartgarden",
            "pluginId": "cordova-plugin-smartgarden",
            "clobbers": [
                "smartgarden"
            ]
        },
        {
            "file": "plugins/cordova-plugin-smartgarden/src/browser/Smartgarden.js",
            "id": "cordova-plugin-smartgarden.SmartgardenBrowser",
            "pluginId": "cordova-plugin-smartgarden",
            "merges": [
                "smartgarden"
            ]
        }
    ];
    module.exports.metadata = 
    // TOP OF METADATA
    {
        "cordova-plugin-whitelist": "1.3.4",
        "cordova-plugin-ble-central": "1.3.1",
        "cordova-plugin-geolocation": "4.1.0",
        "cordova-plugin-smartgarden": "1.0.0"
    }
    // BOTTOM OF METADATA
    });
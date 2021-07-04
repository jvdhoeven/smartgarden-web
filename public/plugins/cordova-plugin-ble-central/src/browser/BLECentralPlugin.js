cordova.define("cordova-plugin-ble-central.BLECentralPlugin", function(require, exports, module) { function notSupported() {
    console.log('BLE is not supported on the browser');
}
var stringToArrayBuffer = function(str) {
    var ret = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        ret[i] = str.charCodeAt(i);
    }
    return ret.buffer;
};

var base64ToArrayBuffer = function(b64) {
    return stringToArrayBuffer(atob(b64));
};

function massageMessageNativeToJs(message) {
    if (message.CDVType == 'ArrayBuffer') {
        message = base64ToArrayBuffer(message.data);
    }
    return message;
}

// Cordova 3.6 doesn't unwrap ArrayBuffers in nested data structures
// https://github.com/apache/cordova-js/blob/94291706945c42fd47fa632ed30f5eb811080e95/src/ios/exec.js#L107-L122
function convertToNativeJS(object) {
    Object.keys(object).forEach(function (key) {
        var value = object[key];
        object[key] = massageMessageNativeToJs(value);
        if (typeof(value) === 'object') {
            convertToNativeJS(value);
        }
    });
}

var notification = [];
var scanInterval = null;

module.exports = {
    scan: function (services, seconds, success, failure) {
        var i = 1;
        scanInterval = setInterval(() => {
            if(i > 10) {
                return;
            }
            success({'name':`Smartgarden Fake ${i}`,"id":"DC:A6:32:99:C4:53","advertising":{},"rssi":-59});
            i++;
        }, 400);

        setTimeout(() => {
            clearInterval(scanInterval);
        }, seconds * 1000)
    },

    startScan: function (services, success, failure) {
        console.log('startScan');
        var i = 1;
        scanInterval = setInterval(() => {
            if(i > 10) {
                return;
            }
            success({'name':`Smartgarden Fake ${i}`,"id":"DC:A6:32:99:C4:53","advertising":{},"rssi":-59});
            i++;
        }, 2000);
    },

    stopScan: function (success, failure) {
        console.log('stopScan');
        success();
        clearInterval(scanInterval);
    },

    startScanWithOptions: function(services, options, success, failure) {

    },

    // iOS only
    connectedPeripheralsWithServices: function(services, success, failure) {

    },

    // iOS only
    peripheralsWithIdentifiers: function(identifiers, success, failure) {

    },

    // Android only
    bondedDevices: function(success, failure) {

    },

    // this will probably be removed
    list: function (success, failure) {

    },

    connect: function (device_id, success, failure) {
        console.log('connect');
        const peripheral = {
            "name": "Smartgarden",
            "id": "DC:A6:32:99:C4:53",
            "advertising": {},
            "rssi": -61,
            "services": ["1800", "1801", "4fafc201-1fb5-459e-8fcc-c5c9c331914b"],
            "characteristics": [{
                "service": "1800",
                "characteristic": "2a00",
                "properties": ["Read"]
            }, {
                "service": "1800",
                "characteristic": "2a01",
                "properties": ["Read"]
            }, {
                "service": "1801",
                "characteristic": "2a05",
                "properties": ["Indicate"],
                "descriptors": [{
                    "uuid": "2902"
                }]
            }, {
                "service": "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
                "characteristic": "beb5483e-36e1-4688-b7f5-ea07361b26a8",
                "properties": ["Read", "Notify"],
                "descriptors": [{
                    "uuid": "2902"
                }]
            }, {
                "service": "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
                "characteristic": "a10b02a4-3b1c-45b5-a617-5648120f8e4c",
                "properties": ["Read", "Notify"],
                "descriptors": [{
                    "uuid": "2902"
                }]
            }, {
                "service": "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
                "characteristic": "9a0c0611-a48f-4dbc-bde2-31582e606ee5",
                "properties": ["Read", "Notify"],
                "descriptors": [{
                    "uuid": "2902"
                }]
            }, {
                "service": "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
                "characteristic": "c3134125-b92d-479f-a437-2de8cea412e7",
                "properties": ["Read", "Write", "Notify"],
                "descriptors": [{
                    "uuid": "2902"
                }]
            }]
        };
        success(peripheral);
    },

    autoConnect: function (deviceId, connectCallback, disconnectCallback) {

    },

    disconnect: function (device_id, success, failure) {

    },

    queueCleanup: function (device_id,  success, failure) {

    },

    setPin: function (pin, success, failure) {

    },

    requestMtu: function (device_id, mtu,  success, failure) {

    },

    requestConnectionPriority: function (device_id, connectionPriority, success, failure) {

    },

    refreshDeviceCache: function(deviceId, timeoutMillis, success, failure) {

    },

    // characteristic value comes back as ArrayBuffer in the success callback
    read: function (device_id, service_uuid, characteristic_uuid, success, failure) {
        if(characteristic_uuid === '9a0c0611-a48f-4dbc-bde2-31582e606ee5') {
            success(stringToArrayBuffer(`${Number(Math.random() * 100).toFixed(2)}`));
        } else {
            success(stringToArrayBuffer(`${Number(Math.random() * 15).toFixed(2)}`));
        }
    },

    // RSSI value comes back as an integer
    readRSSI: function(device_id, success, failure) {

    },

    // value must be an ArrayBuffer
    write: function (device_id, service_uuid, characteristic_uuid, value, success, failure) {

    },

    // value must be an ArrayBuffer
    writeWithoutResponse: function (device_id, service_uuid, characteristic_uuid, value, success, failure) {

    },

    // value must be an ArrayBuffer
    writeCommand: function (device_id, service_uuid, characteristic_uuid, value, success, failure) {

    },

    // success callback is called on notification
    notify: function (device_id, service_uuid, characteristic_uuid, success, failure) {

    },

    // success callback is called on notification
    startNotification: function (device_id, service_uuid, characteristic_uuid, success, failure) {
        console.log('startNotification');
        notification[characteristic_uuid] = setInterval(() => {
            if(characteristic_uuid === '9a0c0611-a48f-4dbc-bde2-31582e606ee5') {
                success(stringToArrayBuffer(`${Number(Math.random() * 100).toFixed(2)}`));
            } else {
                success(stringToArrayBuffer(`${Number(Math.random() * 15).toFixed(2)}`));
            }
        }, 1000);
    },

    // success callback is called when the descriptor 0x2902 is written
    stopNotification: function (device_id, service_uuid, characteristic_uuid, success, failure) {
        console.log('stopNotification');
        clearInterval(notification[characteristic_uuid]);
    },

    isConnected: function (device_id, success, failure) {

    },

    isEnabled: function (success, failure) {

    },

    // Android only
    isLocationEnabled: function (success, failure) {

    },

    enable: function (success, failure) {

    },

    showBluetoothSettings: function (success, failure) {

    },

    startStateNotifications: function (success, failure) {

    },

    stopStateNotifications: function (success, failure) {

    }
};

});

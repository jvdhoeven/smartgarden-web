cordova.define("cordova-plugin-smartgarden.smartgarden", function(require, exports, module) {
    module.exports = {
        changeTitle: function (title, success, error) {
            cordova.exec(success, error, "Smartgarden", "changeTitle", [ title ]);
        },
        showBottomBar: function (title, success, error) {
            cordova.exec(success, error, "Smartgarden", "showBottomBar", []);
        },
        hideBottomBar: function (title, success, error) {
            cordova.exec(success, error, "Smartgarden", "hideBottomBar", []);
        },
        setBottomBarItem: function (item, success, error) {
            cordova.exec(success, error, "Smartgarden", "setBottomBarItem", [ item ]);
        }
    }
});

cordova.define("cordova-plugin-smartgarden.SmartgardenBrowser", function(require, exports, module) {
    module.exports = {
        changeTitle: function (title, success, error) {
            console.log(title);
        },
        showBottomBar: function (title, success, error) {
            console.log('showBottomBar');
        },
        hideBottomBar: function (title, success, error) {
            console.log('hideBottomBar');
        },
        setBottomBarItem: function (item, success, error) {
            console.log('setBottomBarItem');
        }
    }
});

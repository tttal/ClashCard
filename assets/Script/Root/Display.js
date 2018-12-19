var root = require('Root');
cc.Class({
    extends: cc.Component,
    properties: {

    },
    onLoad() {
        cc.game.setFrameRate(120);
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var x = 1138 / 640;
        var y = windowHeight / windowWidth;
        root.cheight = (((1138 - 1138 * (x / y)) / 2) / (x / y)) * 2;
        cc.find('Canvas/UI').scale = (x / y);
        cc.find('Canvas/UI/Top').y = cc.find('Canvas/UI/Top').y + ((1138 - 1138 * (x / y)) / 2) / (x / y);
        cc.find('Canvas/UI/Bottom').y = cc.find('Canvas/UI/Bottom').y - ((1138 - 1138 * (x / y)) / 2) / (x / y);
        cc.find('Canvas/Game').scale = (x / y);
        cc.find('Canvas/Alert').scale = (x / y);
        cc.find('Canvas/Request').scale = (x / y);
    },
});

var root = require('Root');
cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad() {
        root.game.energy = 0;
        var sun = this;
        sun.energyInt = setInterval(function () {
            if (root.game.energy >= 1000) {
                root.game.energy = 1000;
            } else {
                root.game.energy++;
                var index = Math.ceil((root.game.energy + 1) / 100) - 1;
                var scalex = (root.game.energy % 100) / 100;
                if (index != 10) {
                    sun.node.children[index].children[0].scaleX = scalex
                }
                for (var i = index + 1; i <= 9; i++) {
                    sun.node.children[i].children[0].scaleX = 0;
                }
                sun.node.children[10].children[0].children[0].getComponent(cc.Label).string = index;
            }
        }, 2);
    },
    start() {
    },
});

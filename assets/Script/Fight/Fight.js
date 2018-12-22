var root = require('Root');
var Fight = cc.Class({
    extends: cc.Component,

    properties: {
        InTheHand: {
            default: null,
            type: cc.Node,
            displayName: '手牌显示的节点',
        },
        CardPerfab: {
            default: null,
            type: cc.Prefab,
            displayName: '卡片的预制',
        },
    },
    onLoad() {
        var cns = cc.find('Canvas').getComponent('CentralNervousSystem');
        cns.specifyIDAndDirectionToCreateRoles(3, 'left', 200, 6);
        root.user.cardGroup = [3];
        cc.game.setFrameRate(120);
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var x = 1138 / 640;
        var y = windowHeight / windowWidth;
        root.cheight = (((1138 - 1138 * (x / y)) / 2) / (x / y)) * 2;
        cc.find('Canvas/UI').scale = (x / y);
        root.intshow = x / y;
        cc.find('Canvas/UI/Top').y = cc.find('Canvas/UI/Top').y + ((1138 - 1138 * (x / y)) / 2) / (x / y);
        cc.find('Canvas/UI/Bottom').y = cc.find('Canvas/UI/Bottom').y - ((1138 - 1138 * (x / y)) / 2) / (x / y);
        cc.find('Canvas/Game').scale = (x / y);
        cc.find('Canvas/Alert').scale = (x / y);
        cc.find('Canvas/Request').scale = (x / y);

    },
    //生成手牌
    InTheHandDo() {
        var sun = this;
        //初始化卡组数据
        for (var i = 0; i < root.game.initialNumber; i++) {
            var index = 0 + Math.round(Math.random() * (root.user.cardGroup.length - 1));
            sun.inCard(root.user.cardGroup[index]);
        }
    },
    //生成卡片  
    inCard(index) {
        var sun = cc.find('Canvas').getComponent('Fight');
        if (sun.InTheHand.children.length >= 5) {
        } else {
            var card = cc.instantiate(sun.CardPerfab);
            card.parent = sun.InTheHand;
            card.getComponent('Card').instantiation(index);
        }
    },
    toIndex() {
        cc.director.loadScene('Index');
    },
    start() {
        var sun = this;
        sun.InTheHandDo();
    },
    // update (dt) {},
});
module.exports = new Fight();

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        node1: {
            default: null,
            type: cc.Node,
            displayName: '取消状态底层节点',
        },
        node2: {
            default: null,
            type: cc.Node,
            displayName: '启用状态底层节点',
        },
        node3: {
            default: null,
            type: cc.Node,
            displayName: '圆形节点',
        },
        buff: {
            default: false,
            displayName: '默认启用',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var sun = this;
        if (sun.buff) {
            sun.node1.active = false;
            sun.node3.setPosition(-53.7, 0);
        }
    },

    click() {
        var sun = this;
        if (sun.buff) {
            sun.node1.active = true;
            sun.node3.setPosition(1.3, 0);
            sun.buff = false;
        } else {
            sun.node1.active = false;
            sun.node3.setPosition(-53.7, 0);
            sun.buff = true;
        }
    },

    start() {

    },

    // update (dt) {},
});

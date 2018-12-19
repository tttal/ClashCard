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
        copy: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var sun = this;
        sun.node.on(cc.Node.EventType.CHILD_ADDED, function (event) {
            console.log(event.getComponent('Role').self);
            if (event.getComponent('Role').self) {
                event.getComponent('Role').monitor();
                var copy = cc.instantiate(event);
                copy.setPosition(copy.x, -copy.y);
                copy.getComponent('Role').self = !1;
                copy.parent = cc.find('Canvas/Game/GameB');

            }


        }, this);

        //弄个假的


    },

    start() {

    },

    // update (dt) {},
});

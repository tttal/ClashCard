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
        self: !!1,
        running: !1,
        atking: !1,
        id: {
            default: 0,
            displayName: 'ID',
        },
        lin: {
            default: 0,
            displayName: '攻击距离',
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //开始移动
    run() {
        var sun = this;
        var anim = sun.node.getChildByName('Role').getComponent(cc.Animation);
        anim.play('Action3');
        var action = cc.repeatForever(
            cc.moveBy(1, 0, 50)
        );
        action.setTag(3);
        sun.node.runAction(
            action

        );
    },

    //干
    atk() {
        var sun = this;
        sun.node.stopActionByTag(3);
        var anim = sun.node.getChildByName('Role').getComponent(cc.Animation);
        anim.play('Action2');
    },


    monitor() {
        var sun = this;
        var POSITION_CHANGED = function () {

            //角色移动是监听,如果攻击范围内有内标,就攻击

            //获取当前角色位置
            var rolePositionY = sun.node.y;
            var rolePositionX = sun.node.x;

            //选定攻击范围
            var atkMax = sun.node.y + sun.lin;
            var atkMin = sun.node.y;

            //统计数量

            if (!sun.atking) {
                var index = 0;
                cc.find('Canvas/Game/GameB').children.forEach(function (key) {
                    if (!index) {
                        if (key.x == rolePositionX) {//选取在同一行的
                            if (key.getComponent('Role').self == false) {//排除友方的
                                if (key.y > atkMin && key.y < atkMax) {//选定在攻击范围的
                                    index++;//数量增加

                                }

                            }
                        }
                    }

                });
                if (index) {//如果有符合的就攻击
                    if (!sun.atking) {
                        sun.atking = !!1;//声明角色正在攻击
                        sun.running = !1;//角色当前没有行走了
                        sun.atk();//执行攻击
                    }
                }
            }




            // cc.find('Canvas/Game/GameB').children.forEach(function (key) {
            //     if (key != sun.node) {
            //         if (key.x == sun.node.x && key.y - sun.node.y < sun.lin && key.y - sun.node.y >= 0) {
            //             if (!(key.getComponent('Role').self)) {

            //                 if (!sun.atking) {
            //                     sun.atking = !!1;
            //                     sun.running = !1;
            //                     sun.atk();
            //                 }
            //             }

            //         } else if (sun.node.y + sun.lin >= 340) {
            //             if (!sun.atking) {
            //                 sun.atking = !!1;
            //                 sun.running = !1;
            //                 sun.atk();
            //             }
            //         } else {
            //             if (!sun.running) {
            //                 sun.running = !!1;
            //                 sun.run();
            //             }
            //         }
            //     } else {

            //     }


            // });


        }
        // setInterval(function () {
        //     POSITION_CHANGED();
        // }, 1000);
        sun.node.on(cc.Node.EventType.POSITION_CHANGED, POSITION_CHANGED, this);
        sun.running = !!1;
        sun.run();
    },

    start() {

    },

    // update (dt) {},
});

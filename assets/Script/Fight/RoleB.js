var root = require('Root');
cc.Class({
    extends: cc.Component,
    properties: {
        self: false,
        moving: false,
        attacking: false,
        id: {
            default: 0,
            displayName: 'ID',
        },
        distance: {
            default: 0,
            displayName: '攻击距离',
        },
        HealthPointNode: {
            default: null,
            type: cc.Node,
            displayName: 'HP',
        },

    },

    /**
     * 让角色开始移动
     */
    run() {
        var a = this;
        a.node.stopActionByTag(3);//停止Tag3(之前的移动)的动作(/如果有)
        var b = a.node.getChildByName('Role').getComponent(cc.Animation);//获取角色的动画组件
        b.play('Action3');//播放移动的动画
        var c = cc.repeatForever(//让角色持续移动
            cc.moveBy(1, 0, -50)
        );
        c.setTag(3);//给动作设置标签(3)
        a.node.runAction(//执行动作
            c
        );
    },

    /**
     * 
     */
    onAtk() {
        var a = this;
        a.node.stopActionByTag(3);//停止Tag3(之前的移动)的动作(/如果有)
        var b = a.node.getChildByName('Role').getComponent(cc.Animation);//获取角色的动画组件
        b.play('Action2');//播放攻击的动画
        b.off('lastframe', a.onLastframe, this);
        a.onLastframe = function () {//监听每次动画播放完成
            //让所有在攻击范围的单位掉血
            var d = a.node.x;
            var g = a.node.y - a.distance;
            var f = a.node.y;
            var e = 0;
            cc.find('Canvas/Game/GameB').children.forEach(function (key) {
                if (key.x == d) {
                    if (key.getComponent('Role')) {
                        if (key.getComponent('Role').self == true) {
                            if (key.y < f && key.y > g) {
                                e++;
                                key.getComponent('Role').onHP(a.atk);
                            }
                        }
                    }

                }
            });
            if (e == 0) {
                a.run();
                a.attacking = false;
            }
        }
        b.on('lastframe', a.onLastframe, this);
    },


    onHP(atk) {
        var a = this;
        a.hp -= atk;
        var sc = a.hp / a.ohp;
        if (sc <= 0) {
            sc = 0;
            a.HealthPointNode.scaleX = sc;
            a.node.destroy();
            a.attacking = false;
        } else {
            a.HealthPointNode.scaleX = sc;
        }

    },


    monitor() {
        var a = this;
        a.onget();
        var POSITION_CHANGED = function () {
            a.node.zIndex = -a.node.y;
            var d = a.node.x;
            var g = a.node.y - a.distance;
            var f = a.node.y;
            if (!a.attacking) {
                var e = 0;
                cc.find('Canvas/Game/GameB').children.forEach(function (key) {
                    if (!e) {
                        if (key.x == d) {
                            if (key.getComponent('Role')) {
                                if (key.getComponent('Role').self == true) {
                                    if (key.y < f && key.y > g) {
                                        e++;
                                    }
                                }
                            }

                        }
                    }
                });
                if (e) {
                    if (!a.attacking) {
                        a.attacking = true;
                        a.moving = false;
                        a.onAtk();
                    }
                }
            }
        }
        a.node.on(cc.Node.EventType.POSITION_CHANGED, POSITION_CHANGED, this);
        a.moving = true;
        a.run();
    },

    onget() {
        var a = this;
        var config = root.roleConfig[a.id - 1];
        var grade = a.node._grade;
        a.atk = config.lniatk + grade * config.upatk;
        a.hp = config.lnihp + grade * config.uphp;
        a.ohp = a.hp;
    },

    start() {
        var a = this;
        a.onget();
        a.node.zIndex = -a.node.y;
        a.monitor();
    },

    // update (dt) {},
});

var root = require('Root');
cc.Class({
    extends: cc.Component,
    properties: {
        self: true,
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
        b.play('Action3R');//播放移动的动画
        var c = cc.repeatForever(//让角色持续移动
            cc.moveBy(1, 0, 50)
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
        b.play('Action2R');//播放攻击的动画
        a.onLastframe = function () {//监听每次动画播放完成
            //让所有在攻击范围的单位掉血
            var d = a.node.x;
            var g = a.node.y + a.distance;
            var f = a.node.y;
            var e = 0;
            cc.find('Canvas/Game/GameB').children.forEach(function (key) {
                if (key.x == d) {
                    if (key.getComponent('RoleB')) {
                        if (key.getComponent('RoleB').self == false) {
                            if (key.y > f && key.y < g) {
                                e++;
                                key.getComponent('RoleB').onHP(a.atk);
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
        console.log(atk);
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
            var g = a.node.y + a.distance;
            var f = a.node.y;
            if (g >= 310) {
                if (!a.attacking) {
                    a.attacking = true;
                    a.moving = false;
                    a.onAtk();
                }
                return (false);
            }
            if (!a.attacking) {
                var e = 0;
                cc.find('Canvas/Game/GameB').children.forEach(function (key) {
                    if (!e) {
                        if (key.x == d) {
                            if (key.getComponent('RoleB')) {
                                if (key.getComponent('RoleB').self == false) {
                                    if (key.y > f && key.y < g) {
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
        switch (a.id) {
            case 1:
                var grade = root.role.grade1;
                break;
            case 2:
                var grade = root.role.grade2;
                break;
            case 3:
                var grade = root.role.grade3;
                break;
            case 4:
                var grade = root.role.grade4;
                break;
            case 5:
                var grade = root.role.grade5;
                break;
            case 6:
                var grade = root.role.grade6;
                break;
            case 7:
                var grade = root.role.grade7;
                break;
            case 8:
                var grade = root.role.grade8;
                break;
            case 9:
                var grade = root.role.grade9;
                break;
            case 10:
                var grade = root.role.grade10;
                break;
            default:
                break;
        }
        a.atk = config.lniatk + grade * config.upatk;
        a.hp = config.lnihp + grade * config.uphp;
        a.ohp = a.hp;
    },

    start() {
        var a = this;
        a.onget();
        a.node.zIndex = -a.node.y;
    },

    // update (dt) {},
});

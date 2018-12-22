var root = require('Root');
cc.Class({
    extends: cc.Component,

    properties: {
        role01: {
            default: null,
            type: cc.Texture2D,
            displayName: '三兄弟',
        },
        role02: {
            default: null,
            type: cc.Texture2D,
            displayName: '牛头怪',
        },
        role03: {
            default: null,
            type: cc.Texture2D,
            displayName: '兽人',
        },
        role04: {
            default: null,
            type: cc.Texture2D,
            displayName: '天使',
        },
        role05: {
            default: null,
            type: cc.Texture2D,
            displayName: '猎人',
        },
        role06: {
            default: null,
            type: cc.Texture2D,
            displayName: '女法师',
        },
        role07: {
            default: null,
            type: cc.Texture2D,
            displayName: '小丑女',
        },
        role08: {
            default: null,
            type: cc.Texture2D,
            displayName: '精灵弩手',
        },
        role09: {
            default: null,
            type: cc.Texture2D,
            displayName: '绵羊',
        },
        role10: {
            default: null,
            type: cc.Texture2D,
            displayName: '雪怪',
        },
        ShowCard: {
            default: null,
            type: cc.Node,
            displayName: '显示卡片的节点',
        },
        id: null,
        Round: {
            default: null,
            type: cc.Node,
            displayName: '进度',
        },
        Text: {
            default: null,
            type: cc.Node,
            displayName: '显示',
        },

        role001: {
            default: null,
            type: cc.Prefab,
            displayName: '三兄弟',
        },
        role002: {
            default: null,
            type: cc.Prefab,
            displayName: '牛头怪',
        },
        role003: {
            default: null,
            type: cc.Prefab,
            displayName: '兽人',
        },
        role004: {
            default: null,
            type: cc.Prefab,
            displayName: '天使',
        },
        role005: {
            default: null,
            type: cc.Prefab,
            displayName: '猎人',
        },
        role006: {
            default: null,
            type: cc.Prefab,
            displayName: '女法师',
        },
        role007: {
            default: null,
            type: cc.Prefab,
            displayName: '小丑女',
        },
        role008: {
            default: null,
            type: cc.Prefab,
            displayName: '精灵弩手',
        },
        role009: {
            default: null,
            type: cc.Prefab,
            displayName: '绵羊',
        },
        role010: {
            default: null,
            type: cc.Prefab,
            displayName: '雪怪',
        },
        role: null,
        oleft: false,
        ocenter: false,
        oright: false,
    },
    start() {
        var sun = this;
        var touch_end = function () {
            try {
                sun.role.destroy();
            } catch (error) {

            }
            if (!sun.can) {
                return (false);
            }
            if (cc.find('Canvas/Game/GameA').children.length == 1) {
                cc.find('Canvas/Game/GameA').children[0].getComponent('Role').self = !!1;
                cc.find('Canvas/Game/GameA').children[0].parent = cc.find('Canvas/Game/GameB');
                if (root.roleConfig[sun.id - 1].energy <= root.game.energy) {
                    root.game.energy -= root.roleConfig[sun.id - 1].energy;
                    this.node.destroy();
                } else {
                    console.log('能量不够啊兄弟');
                }
            }
        };
        sun.node.on(cc.Node.EventType.TOUCH_CANCEL, touch_end, this);
        sun.node.on(cc.Node.EventType.TOUCH_END, touch_end, this);
        sun.node.on(cc.Node.EventType.TOUCH_START, function () {
            if (root.roleConfig[sun.id - 1].energy <= root.game.energy) {
                sun.can = !!1;
                switch (sun.id) {
                    case 1:
                        sun.role = cc.instantiate(sun.role001);
                        break;
                    case 2:
                        sun.role = cc.instantiate(sun.role002);
                        break;
                    case 3:
                        sun.role = cc.instantiate(sun.role003);
                        break;
                    case 4:
                        sun.role = cc.instantiate(sun.role004);
                        break;
                    case 5:
                        sun.role = cc.instantiate(sun.role005);
                        break;
                    case 6:
                        sun.role = cc.instantiate(sun.role006);
                        break;
                    case 7:
                        sun.role = cc.instantiate(sun.role007);
                        break;
                    case 8:
                        sun.role = cc.instantiate(sun.role008);
                        break;
                    case 9:
                        sun.role = cc.instantiate(sun.role009);
                        break;
                    case 10:
                        sun.role = cc.instantiate(sun.role010);
                        break;
                    default:
                        break;
                }
                var posi = this.node.convertToWorldSpace(0, 0);
                var gameCwidth = cc.find('Canvas/Game/GameC').width / 2;
                var gameCheight = cc.find('Canvas/Game/GameC').height / 2;
                var pwidth = sun.role.width;
                var pheight = sun.role.height;
                sun.role.setPosition((posi.x - gameCwidth + pwidth) / root.intshow, posi.y - gameCheight + pheight);
                sun.role.parent = cc.find('Canvas/Game/GameC');
            } else {

            }
        }, this);
        sun.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (!sun.can) {
                return (false);
            }
            var delta = event.touch.getDelta();//获触摸移动的距离
            sun.role.x += delta.x;//重置节点位置到触摸的坐标
            sun.role.y += delta.y;//重置节点位置到触摸的坐标
            if (sun.role.x > -185 && sun.role.x < -125) {
                if (sun.oleft == !1) {
                    sun.oleft = !!1;
                    sun.rolea = cc.instantiate(sun.role);
                    sun.rolea.parent = cc.find('Canvas/Game/GameA');
                    sun.rolea.setPosition(-145, sun.role.y);
                    sun.role.opacity = 0;
                }
                try {
                    sun.rolea.y += delta.y;
                    if (sun.rolea.y >= root.left) {
                        sun.rolea.y = root.left;
                    }
                    if (sun.rolea.y <= -340) {
                        sun.rolea.y = -340;
                    }
                } catch (error) {
                }
            } else if (sun.role.x > -50 && sun.role.x < 40) {
                if (sun.ocenter == !1) {
                    sun.ocenter = !!1;
                    sun.rolea = cc.instantiate(sun.role);
                    sun.rolea.parent = cc.find('Canvas/Game/GameA');
                    sun.rolea.setPosition(0, sun.role.y);
                    sun.role.opacity = 0;
                }
                try {
                    sun.rolea.y += delta.y;
                    if (sun.rolea.y >= root.center) {
                        sun.rolea.y = root.center;
                    }
                    if (sun.rolea.y <= -340) {
                        sun.rolea.y = -340;
                    }
                } catch (error) {

                }
            } else if (sun.role.x > 90 && sun.role.x < 180) {
                if (sun.oright == !1) {
                    sun.oright = !!1;
                    sun.rolea = cc.instantiate(sun.role);
                    sun.rolea.parent = cc.find('Canvas/Game/GameA');
                    sun.rolea.setPosition(145, sun.role.y);
                    sun.role.opacity = 0;
                }
                try {
                    sun.rolea.y += delta.y;
                    if (sun.rolea.y >= root.right) {
                        sun.rolea.y = root.right;
                    }
                    if (sun.rolea.y <= -340) {
                        sun.rolea.y = -340;
                    }
                } catch (error) {
                }
            } else {
                if (sun.oleft || sun.ocenter || sun.oright) {
                    cc.find('Canvas/Game/GameA').removeAllChildren();
                }
                sun.oleft = !1;
                sun.ocenter = !1;
                sun.oright = !1;
                sun.role.opacity = 255;
            }
        }, this);

    },
    instantiation(index) {
        var sun = this;
        sun.id = index;
        switch (index) {
            case 1:
                var show2D = sun.role01;
                break;
            case 2:
                var show2D = sun.role02;
                break;
            case 3:
                var show2D = sun.role03;
                break;
            case 4:
                var show2D = sun.role04;
                break;
            case 5:
                var show2D = sun.role05;
                break;
            case 6:
                var show2D = sun.role06;
                break;
            case 7:
                var show2D = sun.role07;
                break;
            case 8:
                var show2D = sun.role08;
                break;
            case 9:
                var show2D = sun.role09;
                break;
            case 10:
                var show2D = sun.role10;
                break;
        }
        var spriteFrame = new cc.SpriteFrame(show2D);
        sun.ShowCard.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        sun.Text.getComponent(cc.Label).string = root.roleConfig[sun.id - 1].energy / 100;
    },
    update(dt) {
        var sun = this;
        if (root.roleConfig[sun.id - 1].energy >= root.game.energy) {
            sun.Round.getComponent(cc.Sprite).fillRange = - (root.game.energy / root.roleConfig[sun.id - 1].energy);
        } else {
            sun.Round.getComponent(cc.Sprite).fillRange = 0;
        }
    },
});

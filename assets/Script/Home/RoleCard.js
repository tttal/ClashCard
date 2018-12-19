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
        showRoleCard: {
            default: null,
            type: cc.Node,
            displayName: '卡片展示节点',
        },
        grade: {
            default: null,
            type: cc.Node,
            displayName: '等级显示节点',
        },
        ex: {
            default: null,
            type: cc.Node,
            displayName: '当前经验',
        },
        Strip011: {
            default: null,
            type: cc.Node,
            displayName: '不能升级的经验条',
        },
        Strip012: {
            default: null,
            type: cc.Node,
            displayName: '能升级的经验条',
        },
        BlueArrow: {
            default: null,
            type: cc.Node,
            displayName: '不能升级的箭头',
        },
        GreenArrow: {
            default: null,
            type: cc.Node,
            displayName: '能升级的箭头',
        },
        b: {
            default: null,
            type: cc.Node,
            displayName: '经验',
        },
        have: !!1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var sun = this;
        sun.__home = cc.find('Canvas').getComponent('Home');
    },

    unsetarr(arr, select) {
        var array = Array();
        arr.forEach(function (key) {
            if (key != select) {
                array.push(key);
            }
        });
        return (array);
    },

    clickCard() {
        var sun = this;
        if (sun.node.parent.name === "Line2") {
            if (sun.node.parent.children.length <= 4) {
                sun.__home.text('最小值,不能取消选择了');
            } else {
                sun.node.destroy();
                root.user.cardGroup = sun.unsetarr(root.user.cardGroup, sun.node._id);
            }
        } else if (sun.node.parent.name === "Line4") {
            if (!sun.have) {
                sun.__home.text('未解锁');
            } else {
                if (root.myCradGroup.children.length >= 8) {
                    sun.__home.text('我的卡组中已经有8张卡了,不能再添加了');
                } else {
                    var h = !!1;
                    root.myCradGroup.children.forEach(function (key) {
                        if (key.name == sun.node.name) {
                            h = !1;
                            sun.__home.text('卡组中有这个卡');
                        }
                    });
                    if (h) {
                        var u = cc.instantiate(sun.node);
                        u.parent = root.myCradGroup;
                        root.user.cardGroup.push(sun.node._id);
                    }
                }

            }
            console.log('加入卡组');
        }
    },

    clickEX() {

    },
    /** 
     * 初始化
     */
    int(roleid) {
        console.log(roleid);
        var sun = this;
        sun.node.name = 'roleCard' + roleid;
        switch (roleid) {
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
            default:
                break;
        }
        var spriteFrame = new cc.SpriteFrame(show2D);
        sun.showRoleCard.getComponent(cc.Sprite).spriteFrame = spriteFrame;

        //检查是否有这个卡
        switch (roleid) {
            case 1:
                var have = root.role.role1;
                break;
            case 2:
                var have = root.role.role2;
                break;
            case 3:
                var have = root.role.role3;
                break;
            case 4:
                var have = root.role.role4;
                break;
            case 5:
                var have = root.role.role5;
                break;
            case 6:
                var have = root.role.role6;
                break;
            case 7:
                var have = root.role.role7;
                break;
            case 8:
                var have = root.role.role8;
                break;
            case 9:
                var have = root.role.role9;
                break;
            case 10:
                var have = root.role.role10;
                break;
            default:
                break;
        }
        //获取卡的等级
        switch (roleid) {
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

        if (have) {
            sun.grade.getComponent(cc.Label).string = grade + '级';
        } else {
            sun.grade.getComponent(cc.Label).string = '未解锁';
        }
        //获取卡的经验值
        switch (roleid) {
            case 1:
                var ex = root.role.ex1;
                break;
            case 2:
                var ex = root.role.ex2;
                break;
            case 3:
                var ex = root.role.ex3;
                break;
            case 4:
                var ex = root.role.ex4;
                break;
            case 5:
                var ex = root.role.ex5;
                break;
            case 6:
                var ex = root.role.ex6;
                break;
            case 7:
                var ex = root.role.ex7;
                break;
            case 8:
                var ex = root.role.ex8;
                break;
            case 9:
                var ex = root.role.ex9;
                break;
            case 10:
                var ex = root.role.ex10;
                break;
            default:
                break;
        }
        //获取当前角色参数
        var config = root.roleConfig[roleid - 1];
        sun.ex.getComponent(cc.Label).string = ex + '/' + ((config.upex * grade) + config.lniex);
        //获取是否能升级的状态
        if (ex >= ((config.upex * grade) + config.lniex)) {
            //能升级
            sun.GreenArrow.active = true;
        } else {
            //不能升级
            sun.BlueArrow.active = true;
        }
        var t = ex / ((config.upex * grade) + config.lniex);
        var t = t >= 1 ? 1 : t;
        sun.Strip012.scaleX = t;
        if (have) {
            //如果解锁了,显示经验节点
            sun.have = !!1;
            sun.b.active = true;
        } else {
            sun.have = !1;
            root.lniRoleCard.push(sun.node);
            return (true);
        }
    },

    start() {

    },

    // update (dt) {},
});

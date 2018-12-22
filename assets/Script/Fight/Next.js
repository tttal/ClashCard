var root = require('Root');
var fight = require('Fight');
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
        times: 50,
        inu: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {



        var sun = this;
        sun.cont();
        sun.times = 500;
        sun.int = setInterval(function () {
            sun.inu++;
            sun.Round.getComponent(cc.Sprite).fillRange = -(sun.inu / sun.times);
            if (sun.inu >= sun.times) {
                sun.inu = 0;
                fight.inCard(sun.id);
                sun.cont();
            }
        }, 10);

    },


    //将卡组中的随机一个卡片选定
    cont() {
        var sun = this;
        var index = 0 + Math.round(Math.random() * (root.user.cardGroup.length - 1));
        sun.instantiation(root.user.cardGroup[index]);



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

    onDestroy() {
        var sun = this;
        clearInterval(sun.int);
    },

    // update(dt) {
    //     var sun = this;
    //     if (root.roleConfig[sun.id - 1].energy >= root.game.energy) {
    //         sun.Round.getComponent(cc.Sprite).fillRange = - (root.game.energy / root.roleConfig[sun.id - 1].energy);
    //     } else {
    //         sun.Round.getComponent(cc.Sprite).fillRange = 0;
    //     }
    // },
});

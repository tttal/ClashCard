var root = require('Root');
var ccl = require('ChestController');
var Home = cc.Class({
    extends: cc.Component,

    properties: {
        grade1: {
            default: null,
            type: cc.Node,
            displayName: '等级显示的NODE',
        },
        grade2: {
            default: null,
            type: cc.Node,
            displayName: '等级显示的NODE(Lv.)',
        },
        gold1: {
            default: null,
            type: cc.Node,
            displayName: '金币显示的NODE',
        },
        gemstone1: {
            default: null,
            type: cc.Node,
            displayName: '宝石显示的NODE',
        },
        rankPrefab: {
            default: null,
            type: cc.Prefab,
            displayName: '排行榜资源',
        },
        shopPrefab: {
            default: null,
            type: cc.Prefab,
            displayName: '商店资源',
        },
        cardPrefab: {
            default: null,
            type: cc.Prefab,
            displayName: '卡组资源',
        },
        rankNode: {
            default: null,
            type: cc.Node,
            displayName: '排行榜节点',
        },
        shopNode: {
            default: null,
            type: cc.Node,
            displayName: '商店节点',
        },
        CardNode: {
            default: null,
            type: cc.Node,
            displayName: '卡组节点',
        },
        container: {
            default: null,
            type: cc.Node,
            displayName: '进度宝箱容器',
        },
        containerText: {
            default: null,
            type: cc.Node,
            displayName: '显示进度的文字',
        },
        containerChest: {
            default: null,
            type: cc.Node,
            displayName: '显示进度的宝箱图标',
        },
        userInfoPrefab: {
            default: null,
            type: cc.Prefab,
            displayName: '用户信息资源',
        },
        noticeAlertPrefab: {
            default: null,
            type: cc.Prefab,
            displayName: '公告资源',
        },
        setAlertPrefab: {
            default: null,
            type: cc.Prefab,
            displayName: '设置资源',
        },

        textAlert: {
            default: null,
            type: cc.Prefab,
            displayName: '文字弹窗的资源',
        },
        RootAlert: {
            default: null,
            type: cc.Prefab,
            displayName: '通用弹窗',
        },
        AlertTwo: {
            default: null,
            type: cc.Prefab,
            displayName: '第二种弹窗',
        },

    },

    // LIFE-CYCLE CALLBACKS:

    text: function (text) {
        var sun = this;
        var node = cc.instantiate(sun.textAlert);
        node.getChildByName('Text').getComponent(cc.Label).string = text;
        node.parent = cc.find('Canvas/Alert');
        setTimeout(function () {
            try {
                node.destroy();
            } catch (error) {
                console.log('文字的提示不见了');
            }
        }, 1000);
    },

    onLoad() {

        cc.find('Canvas/Alert').on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });
        cc.find('Canvas/Request').on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });
        var sun = this;
        root.rootAlert = sun.RootAlert;
        root.alertTwo = sun.AlertTwo;

        //Com
        root.homeComponent = this;

    },

    start() {
        //test 
        root.test = 1;
        //test

    },

    setAlert() {
        var sun = this;
        var node = cc.instantiate(sun.setAlertPrefab);
        node.parent = cc.find('Canvas/Alert');
    },

    noticeAlert() {
        var sun = this;
        var node = cc.instantiate(sun.noticeAlertPrefab);
        node.parent = cc.find('Canvas/Alert');
    },

    userInfo() {
        var sun = this;
        var node = cc.instantiate(sun.userInfoPrefab);
        node.parent = cc.find('Canvas/Alert');
    },

    reCharge() {
        var sun = this;
        sun.shop(1);
    },

    // 匹配
    matching() {
        cc.director.loadScene('Wait');
    },


    friendFight() {
        if (root.test <= 4) {
            var Chest = ccl.newChest(root.test);
            Chest.insert();
            root.test++;
        }

        if (root.user.progress < 10) {
            root.user.progress++;
        }

    },

    //排行榜
    rank() {
        var sun = this;
        var nodeArr = Array();
        nodeArr.push(sun.rankNode);
        nodeArr.push(sun.shopNode);
        nodeArr.push(sun.CardNode);
        nodeArr.forEach(function (key) {
            key.getChildByName('Selected').active = false;
        });
        sun.rankNode.getChildByName('Selected').active = true;
        cc.find('Canvas/Alert').removeAllChildren();
        var rankNode = cc.instantiate(sun.rankPrefab);
        rankNode.parent = cc.find('Canvas/Alert');

    },

    //商店
    shop(location) {
        var sun = this;
        var nodeArr = Array();
        nodeArr.push(sun.rankNode);
        nodeArr.push(sun.shopNode);
        nodeArr.push(sun.CardNode);
        nodeArr.forEach(function (key) {
            key.getChildByName('Selected').active = false;
        });
        sun.shopNode.getChildByName('Selected').active = true;
        var shopNode = cc.instantiate(sun.shopPrefab);
        cc.find('Canvas/Alert').removeAllChildren();

        shopNode.parent = cc.find('Canvas/Alert');
        var responseStretch = function (node) {
            var size = node.getContentSize();
            node.setContentSize(size.width, size.height + root.cheight);
        }
        responseStretch(shopNode.getChildByName('Backgound'));
        responseStretch(shopNode.getChildByName('scrollview'));
        responseStretch(shopNode.getChildByName('scrollview').getChildByName('scrollBar'));
        responseStretch(shopNode.getChildByName('scrollview').getChildByName('view'));
        if (location) {
            switch (location) {
                case 1:
                    shopNode.getChildByName('scrollview').getChildByName('view').getChildByName('content').setPosition(0, 1400);
                    break;

                default:
                    break;
            }
        }


    },

    //卡组
    card() {
        var sun = this;
        var nodeArr = Array();
        nodeArr.push(sun.rankNode);
        nodeArr.push(sun.shopNode);
        nodeArr.push(sun.CardNode);
        nodeArr.forEach(function (key) {
            key.getChildByName('Selected').active = false;
        });
        sun.CardNode.getChildByName('Selected').active = true;
        var cardNode = cc.instantiate(sun.cardPrefab);
        cc.find('Canvas/Alert').removeAllChildren();

        cardNode.parent = cc.find('Canvas/Alert');
        var responseStretch = function (node) {
            var size = node.getContentSize();
            node.setContentSize(size.width, size.height + root.cheight);
        }
        responseStretch(cardNode.getChildByName('Backgound'));
        responseStretch(cardNode.getChildByName('scrollview'));
        responseStretch(cardNode.getChildByName('scrollview').getChildByName('scrollBar'));
        responseStretch(cardNode.getChildByName('scrollview').getChildByName('view'));
    },

    progress() {
        var sun = this;
        var index = 0;
        sun.container.children.forEach(function (key) {
            if (index <= root.user.progress - 1) {
                key.children[0].active = true;
            } else {
                key.children[0].active = false;
            }
            index++;
        });
        sun.containerText.getComponent(cc.Label).string = root.user.progress;
        if (root.user.progress >= 10) {
            sun.containerChest.getComponent(cc.Button).interactable = true;
        } else {
            sun.containerChest.getComponent(cc.Button).interactable = false;
        }

    },

    update(dt) {
        var sun = this;
        sun.gold1.getComponent(cc.Label).string = root.user.gold;
        sun.gemstone1.getComponent(cc.Label).string = root.user.gemstone;
        sun.grade1.getComponent(cc.Label).string = root.user.grade;
        sun.grade2.getComponent(cc.Label).string = 'Lv.' + root.user.grade;
        if (cc.find('Canvas/Alert').children.length == 0) {
            cc.find('Canvas/Alert').active = false;
            var sun = this;
            var nodeArr = Array();
            nodeArr.push(sun.rankNode);
            nodeArr.push(sun.shopNode);
            nodeArr.push(sun.CardNode);
            nodeArr.forEach(function (key) {
                key.getChildByName('Selected').active = false;
            });
        } else {
            cc.find('Canvas/Alert').active = true;
        }
        if (cc.find('Canvas/Request').children.length == 0) {
            cc.find('Canvas/Request').active = false;
        } else {
            cc.find('Canvas/Request').active = true;
        }
        sun.progress();
    },
});
module.exports = new Home();
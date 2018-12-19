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
        friendsRanking: {
            default: null,
            type: cc.Node,
            displayName: '好友排行OPTION'
        },
        worldRanking: {
            default: null,
            type: cc.Node,
            displayName: '世界排行OPTION'
        },
        content: {
            default: null,
            type: cc.Node,
            displayName: '列表容器'
        },
        rankList: {
            default: null,
            type: cc.Prefab,
            displayName: '列表资源'
        },
    },

    //世界排行
    clickWorldRanking: function () {
        var sun = this;
        sun.friendsRanking.getChildByName('UnSelected2').active = true;
        sun.worldRanking.getChildByName('UnSelected2').active = false;
        sun.cwr();
    },
    //好友排行
    clickFriendsRanking: function () {
        var sun = this;
        sun.worldRanking.getChildByName('UnSelected2').active = true;
        sun.friendsRanking.getChildByName('UnSelected2').active = false;
        sun.cfr();
    },

    //生成好友排行虚拟数据
    cfr() {
        var sun = this;
        sun.content.removeAllChildren();
        for (var n = 0; n <= 30; n++) {
            var ranklist = cc.instantiate(sun.rankList);
            ranklist.getChildByName('Ranking').getComponent(cc.Label).string = (n + 1) + '.';
            if (n <= 2) {
                ranklist.getChildByName('Icons').getChildByName('Rank' + (n + 1)).active = true;
            }
            ranklist.getChildByName('UserMask').getChildByName('UserName').getComponent(cc.Label).string = '大哥' + (n + 1);
            ranklist.getChildByName('Grade').getChildByName('Value').getComponent(cc.Label).string = n + 1;
            ranklist.parent = sun.content;
        }
    },
    //生成世界排行虚拟数据
    cwr() {
        var sun = this;
        sun.content.removeAllChildren();
        for (var n = 0; n <= 30; n++) {
            var ranklist = cc.instantiate(sun.rankList);
            ranklist.getChildByName('Ranking').getComponent(cc.Label).string = (n + 1) + '.';
            if (n <= 2) {
                ranklist.getChildByName('Icons').getChildByName('Rank' + (n + 1)).active = true;
            }
            ranklist.getChildByName('UserMask').getChildByName('UserName').getComponent(cc.Label).string = '小兄弟' + (n + 1);
            ranklist.getChildByName('Grade').getChildByName('Value').getComponent(cc.Label).string = n + 1;
            ranklist.parent = sun.content;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    back() {
        var sun = this;
        sun.node.destroy();
    },

    start() {
        var sun = this;
        sun.cfr();
    },

    // update (dt) {},
});

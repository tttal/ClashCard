var root = require('Root');
cc.Class({
    extends: cc.Component,

    properties: {
        wode: {
            default: null,
            type: cc.Node,
            displayName: '我的牌库',
        },
        card: {
            default: null,
            type: cc.Prefab,
            displayName: '卡片对象',
        },
        group: {
            default: null,
            type: cc.Node,
            displayName: '我的卡组',
        },
    },
    back() {
        var sun = this;
        sun.node.destroy();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var sun = this;
        root.myCradGroup = sun.group;
        root.myCardHroup = sun.wode;

    },

    //生成全部卡牌列表
    lni() {
        var sun = this;
        root.lniRoleCard = Array();
        root.roleConfig.forEach(function (key) {
            var card = cc.instantiate(sun.card)
            card._id = key.id;
            var t = card.getComponent('RoleCard').int(key.id);
            if (t) {

            } else {
                card.parent = sun.wode;

            }
        });
        root.lniRoleCard.forEach(function (key) {
            key.parent = sun.wode;
        });
        sun.myCardGroup();
    },

    //生成我的卡组列表
    myCardGroup() {
        var sun = this;
        root.user.cardGroup.forEach(function (key) {
            var node = cc.instantiate(sun.wode.getChildByName('roleCard' + key));
            node._id = sun.wode.getChildByName('roleCard' + key)._id;
            node.parent = sun.group;
        });
    },


    start() {
        var sun = this;
        sun.lni();
    },

    // update (dt) {},
});

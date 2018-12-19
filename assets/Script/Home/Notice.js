var root = require('Root');
cc.Class({
    extends: cc.Component,
    properties: {
        noticePrefab: {
            default: null,
            type: cc.Prefab,
            displayName: '消息条目资源',
        },
        content: {
            default: null,
            type: cc.Node,
            displayName: '容器',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    close() {
        this.node.destroy();
    },

    onLoad() {
        var sun = this;
        this.node.getChildByName('BackGround').on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });
        root.notice.forEach(function (key) {
            var list = cc.instantiate(sun.noticePrefab);
            list.getChildByName('Date').getComponent(cc.Label).string = key.date;
            list.getChildByName('Abs').getComponent(cc.Label).string = key.abs;
            list.parent = sun.content;
            list.on(cc.Node.EventType.TOUCH_END, function () {
                root.alert({
                    title: '公告',
                    button: '知道了',
                    back() {

                    },
                    ok() {

                    },
                    content: key.content,
                });
            });
        });
        console.log(root.notice);

    },

    start() {

    },

    // update (dt) {},
});

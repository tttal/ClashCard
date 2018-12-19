cc.Class({
    extends: cc.Component,
    properties: {
        pauseTime: {
            default: 5,
            displayName: '滚动完成后停滞时间(s)'
        },
        rollingSpeed: {
            default: 50,
            displayName: '每周期完成的时间(w/s)'
        },
    },
    start() {
        var sun = this;
        var viewWidth = sun.node.width;
        var rolling = sun.node.children[0];
        var rollingWidth = rolling.width - viewWidth;
        if (rollingWidth > 0) {
            rolling.stopAllActions();
            rolling.runAction(
                cc.repeatForever(
                    cc.sequence(
                        cc.moveBy(rollingWidth / sun.rollingSpeed, -rollingWidth, 0),
                        cc.moveBy(sun.pauseTime / 2, 0, 0),
                        cc.callFunc(function () {
                            rolling.setPosition(0, 0);
                        }),
                        cc.moveBy(sun.pauseTime / 2, 0, 0),
                    )
                )
            );
        }

        rolling.on(cc.Node.EventType.SIZE_CHANGED, function () {
            sun.start();
        });
    },

});

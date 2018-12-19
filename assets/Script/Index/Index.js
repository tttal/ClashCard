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
        progressNode: {
            default: null,
            type: cc.Node,
            displayName: '进度条',
        },
        startGameButton: {
            default: null,
            type: cc.Node,
            displayName: '开始游戏按钮',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    startGame() {
        cc.director.loadScene('Home');
    },

    onLoad() {
        var sun = this;



        cc.director.preloadScene('Home', function (completedCount, totalCount, item) {
            var progress = completedCount / totalCount;//获取进度百分比
            sun.progressNode.scaleX = progress;
        }, function (error) {

            cc.director.preloadScene('Wait', function (completedCount, totalCount, item) {
                var progress = completedCount / totalCount;//获取进度百分比
                sun.progressNode.scaleX = progress;
            }, function (error) {

                cc.director.preloadScene('Fight', function (completedCount, totalCount, item) {
                    var progress = completedCount / totalCount;//获取进度百分比
                    sun.progressNode.scaleX = progress;
                }, function (error) {

                    sun.startGameButton.active = true;

                });

            });

        });

      

    },

    start() {

    },

    // update (dt) {},
});

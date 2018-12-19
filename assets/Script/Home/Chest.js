cc.Class({
    extends: cc.Component,
    onLoad() {
        //强行初始化节点状态
        this.node.getChildByName('Icons').children.forEach(function (key) {
            key.active = false;
        });
        this.node.getChildByName('Bottoms').children.forEach(function (key) {
            key.active = false;
        });

        //根据等级选择展示的宝箱
        var info = this.node._info;
        switch (info.level) {
            case 1:
                var showBox = 'Silver';
                break;
            case 2:
                var showBox = 'Diamond';
                break;
            case 3:
                var showBox = 'Rare';
                break;
            case 4:
                var showBox = 'Epic';
                break;
            default:
                break;
        }
        this.node.getChildByName('Icons').getChildByName(showBox).active = true;
        //根据状态选择展示的背景
        console.log(info.unLock);
        this.node.getChildByName('Bottoms').getChildByName('TreasureBox' + info.unLock).active = true;
        //没有解锁的宝箱显示宝箱名称
        switch (info.unLock) {
            case 0:
                this.node.getChildByName('TitleMask').getChildByName('Title').getComponent(cc.Label).string = info.name;
                this.node.getChildByName('Text').getComponent(cc.Label).string = '尚未解锁';
                break;
            case 1:
                this.node.getChildByName('Text').getComponent(cc.Label).string = '立即开启';
                break;
            case 2:
                this.node.getChildByName('TitleMask').getChildByName('Title').getComponent(cc.Label).string = '';
                this.node.getChildByName('Text').getComponent(cc.Label).string = '打开宝箱';
                this.node.getChildByName('Text').runAction(
                    cc.moveBy(0.5, 0, 20)
                );
                this.node.getChildByName('Icons').runAction(
                    cc.moveBy(0.5, 0, 20)
                );
                break;
            default:
                break;
        }

    },

    //点击宝箱
    open() {
        switch (this.node._info.unLock) {
            case 0:
                console.log('尝试解锁宝箱');
                //检查是否有其他宝箱的状态为已经解锁
                var parent = this.node.parent;
                var can = true;
                parent.children.forEach(function (key) {
                    if (key._info.unLock == 1) {
                        can = false;
                    }
                });
                if (can) {
                    console.log('能解锁');
                    this.node.alert(1);
                } else {
                    console.log('场上有已经解锁的宝箱，不能解锁');
                    this.node.alert(0);
                }
                break;
            case 1:
                console.log('尝试提前解锁宝箱');
                this.node.alert(2);
                break;
            case 2:
                console.log('尝试打开宝箱');
                break;
            default:
                break;
        }
    },

    update(dt) {
        if (this.node._info.unLock == 1) {
            this.node.getChildByName('TitleMask').getChildByName('Title').getComponent(cc.Label).string = this.node.getShowOverDate();
            if (this.node.getRemainingTime() == 0) {
                this.node.complete();
            }
        }
    },
});

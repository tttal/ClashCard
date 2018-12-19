var root = require('Root');
var ChestController = cc.Class({
    extends: cc.Component,

    properties: {
        Chest: cc.Prefab,
        ChestBox: cc.Node,
        ChestAlert: cc.Prefab,
    },

    onLoad() {
        var sun = this;
        root.Prefab_Chest = sun.Chest;
        root.Node_ChestBox = sun.ChestBox;
        root.Prefab_ChestAlert = sun.ChestAlert;
    },

    start() {

    },

    /**
     * 使用留存的数据进行初始化
     */
    initChests: function () {

    },

    /**
     * 生成一个宝箱对象(l=>等级)
     */
    newChest: function (l) {
        if (root.Node_ChestBox.children.length > root.chestMaximum) {
            return (false);
        }
        var Chest = cc.instantiate(root.Prefab_Chest);
        var info = root.chestInfo;
        switch (l) {
            case 1:
                var res = info.c1;
                break;
            case 2:
                var res = info.c2;
                break;
            case 3:
                var res = info.c3;
                break;
            case 4:
                var res = info.c4;
                break;
            default:
                break;
        }
        res.level = l;
        res.unLock = 0;
        Chest._info = res;
        Chest.getLevel = function () {
            return (l);
        };
        Chest.unLock = function () {
            if (this._info.unLock == 0) {
                this._info.overTime += Date.parse(new Date()) / 1000;
                this._info.unLock = 1;
                this.getComponent('Chest').onLoad();
            }

        };
        Chest.getOverTime = function () {
            return (this.getInfo().overTime);
        };
        Chest.getName = function () {
            return (this.getInfo().name);
        };
        Chest.getShowOverDate = function () {
            var boxTime = this.getOverTime() - Date.parse(new Date()) / 1000;
            var day = Math.floor(boxTime / 86400);
            var daySubtract = boxTime - day * 86400;
            var hour = Math.floor(daySubtract / 3600);
            var hourSubtract = daySubtract - hour * 3600;
            var minute = Math.floor(hourSubtract / 60);
            var minuteSubtract = hourSubtract - minute * 60;
            var second = minuteSubtract;
            var showString = day + '天' + hour + '小时' + minute + '分' + second + '秒';
            return (showString);
        };
        Chest.getInfo = function () {
            return (this._info);
        };
        Chest.insert = function () {
            console.log(JSON.stringify(this._info));
            this.parent = root.Node_ChestBox;
        };
        Chest.getRemainingTime = function () {
            var time = this.getOverTime() - Date.parse(new Date()) / 1000;
            if (time <= 0) {
                time = 0;
            }
            return (time);
        };
        Chest.complete = function () {
            if (this._info.unLock == 1) {
                this._info.unLock = 2;
                this.getComponent('Chest').onLoad();
            }
        };
        Chest.getSurplusTime = function () {
            return (this.getOverTime() - Date.parse(new Date()) / 1000);
        };
        Chest.read = function () {
            var read = '{"gold":{"min":1000,"max":5000},"card":{"ordi":{"min":50,"max":100},"rare":{"min":0,"max":10},"epic":{"min":10,"max":100}},"overTime":3600,"name":"钻石宝箱","level":2,"unLock":0}';
            var json = JSON.parse(read);
            this._info = json;
            this.insert();
        };
        Chest.alert = function (p) {
            var ChestAlert = cc.instantiate(root.Prefab_ChestAlert);
            //根据宝箱等级显示宝箱图标
            switch (this._info.level) {
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
            console.log(Chest.getInfo());
            ChestAlert.getChildByName('TreasureBox4').getChildByName('Shadow').getChildByName('Icons').getChildByName(showBox).active = true;
            //显示宝箱名称
            ChestAlert.getChildByName('TreasureBox4').getChildByName('ChestName').getComponent(cc.Label).string = this.getName();
            //显示金币获取范围
            ChestAlert.getChildByName('TreasureBox4').getChildByName('StripLeft').getChildByName('GoldText').getComponent(cc.Label).string = Chest.getInfo().gold.min + '-' + Chest.getInfo().gold.max;
            //显示卡片获取的范围
            var cardMin = Chest.getInfo().card.epic.min + Chest.getInfo().card.ordi.min + Chest.getInfo().card.rare.min;
            //监听关闭按钮
            ChestAlert.getChildByName('TreasureBox4').getChildByName('WhiteButton').on(cc.Node.EventType.TOUCH_END, function () {
                ChestAlert.destroy();
                clearInterval(root.overData);
            });
            var cardMax = Chest.getInfo().card.epic.max + Chest.getInfo().card.ordi.max + Chest.getInfo().card.rare.max;
            ChestAlert.getChildByName('TreasureBox4').getChildByName('StripRight').getChildByName('CardText').getComponent(cc.Label).string = cardMin + '-' + cardMax;
            switch (p) {
                case 0:
                    ChestAlert.getChildByName('TreasureBox4').getChildByName('StripButton').getChildByName('Mask').getChildByName('MaskText').getComponent(cc.Label).string = '有其他宝箱正在解锁中';
                    ChestAlert.getChildByName('TreasureBox4').getChildByName('StripButton').getChildByName('GreenButton').active = false;
                    break;
                case 1:
                    ChestAlert.getChildByName('TreasureBox4').getChildByName('StripButton').getChildByName('Mask').getChildByName('MaskText').getComponent(cc.Label).string = '点击按钮开始倒计时';
                    ChestAlert.getChildByName('TreasureBox4').getChildByName('StripButton').getChildByName('GreenButton').getChildByName('Gemstone').removeFromParent();
                    ChestAlert.getChildByName('TreasureBox4').getChildByName('StripButton').getChildByName('GreenButton').getChildByName('ButtonText').getComponent(cc.Label).string = '立即解锁';
                    ChestAlert.getChildByName('TreasureBox4').getChildByName('StripButton').getChildByName('GreenButton').on(cc.Node.EventType.TOUCH_END, function () {
                        Chest.unLock();
                        ChestAlert.destroy();
                    });
                    break;
                case 2:
                    var nums = 0;
                    root.overData = setInterval(function () {
                        ChestAlert.getChildByName('TreasureBox4').getChildByName('StripButton').getChildByName('Mask').getChildByName('MaskText').getComponent(cc.Label).string = '解锁宝箱还需:' + Chest.getShowOverDate();
                        var num = Math.ceil(Chest.getSurplusTime() / root.eachSecond * root.eachGemstone);
                        nums = num;
                        ChestAlert.getChildByName('TreasureBox4').getChildByName('StripButton').getChildByName('GreenButton').getChildByName('ButtonText').getComponent(cc.Label).string = num + '开启';
                    }, 100);
                    ChestAlert.getChildByName('TreasureBox4').getChildByName('StripButton').getChildByName('GreenButton').on(cc.Node.EventType.TOUCH_END, function () {
                        console.log(nums);
                        if (nums > root.user.gemstone) {
                            console.log('宝石不足');
                            root.alertt({
                                left: '知道了',
                                right: '立即充值',
                                leftClick() {

                                },
                                rightClick() {
                                    root.homeComponent.shop(1);
                                },
                                title: '宝石不足',
                                content: '点击立即充值前往商店',
                            });
                        } else {
                            root.user.gemstone -= nums;
                            // 更新用户信息
                            Chest.complete();
                            ChestAlert.destroy();
                            clearInterval(root.overData);
                        }
                    });
                    break;
                default:
                    break;
            }
            ChestAlert.parent = cc.find('Canvas/Alert');
            ChestAlert.getChildByName('Background').on(cc.Node.EventType.TOUCH_START, function (e) {
                e.stopPropagation();
            });
        };
        return (Chest);
    },

    // update (dt) {},
});
module.exports = new ChestController();

module.exports = {

    game: {
        next: 1,
        energy: 0,
        initialNumber: 3,
        group: null,
    },

    user: {
        "id": 1,
        "openid": "test",
        "cardGroup": [3],
        "gold": 90000,
        "gemstone": 80,
        "progress": 5,
        "grade": 20
    },

    gradeEx: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000],

    lniRoleCard: Array(),
    roleConfig: [
        { "id": 1, "name": "1", "lnihp": 1, "uphp": 1, "lniatk": 1, "upatk": 1, "lniex": 20, "upex": 1, "energy": 100 },
        { "id": 2, "name": "2", "lnihp": 2, "uphp": 2, "lniatk": 2, "upatk": 2, "lniex": 2, "upex": 2, "energy": 200 },
        { "id": 3, "name": "3", "lnihp": 3, "uphp": 3, "lniatk": 3, "upatk": 3, "lniex": 3, "upex": 3, "energy": 300 },
        { "id": 4, "name": "4", "lnihp": 4, "uphp": 4, "lniatk": 4, "upatk": 4, "lniex": 4, "upex": 4, "energy": 400 },
        { "id": 5, "name": "5", "lnihp": 5, "uphp": 5, "lniatk": 5, "upatk": 5, "lniex": 5, "upex": 5, "energy": 500 },
        { "id": 6, "name": "6", "lnihp": 6, "uphp": 6, "lniatk": 6, "upatk": 6, "lniex": 6, "upex": 6, "energy": 600 },
        { "id": 7, "name": "7", "lnihp": 7, "uphp": 7, "lniatk": 7, "upatk": 7, "lniex": 7, "upex": 7, "energy": 700 },
        { "id": 8, "name": "8", "lnihp": 8, "uphp": 8, "lniatk": 8, "upatk": 8, "lniex": 8, "upex": 8, "energy": 800 },
        { "id": 9, "name": "9", "lnihp": 9, "uphp": 9, "lniatk": 9, "upatk": 9, "lniex": 9, "upex": 9, "energy": 900 },
        { "id": 10, "name": "10", "lnihp": 10, "uphp": 10, "lniatk": 10, "upatk": 10, "lniex": 10, "upex": 10, "energy": 1000 }
    ],

    notice: [{ "id": 1, "date": "2018-12-17", "abs": "公告的简介", "content": "公告的内容公告的内容公告的内容公告的内容公告的内容公告的内容公告的内容公告的内容公告的内容公告的内容公告的内容公告的内容公告的内容公告的内容公告的内容公告的内容" }],

    role: {
        "id": 1,
        "role1": 1,
        "role2": 1,
        "role3": 1,
        "role4": 1,
        "role5": 1,
        "role6": 1,
        "role7": 1,
        "role8": 1,
        "role9": 1,
        "role10": 1,
        "grade1": 1,
        "grade2": 2,
        "grade3": 3,
        "grade4": 4,
        "grade5": 5,
        "grade6": 6,
        "grade7": 7,
        "grade8": 8,
        "grade9": 1,
        "grade10": 1,
        "ex1": 12,
        "ex2": 12,
        "ex3": 13,
        "ex4": 14,
        "ex5": 13,
        "ex6": 21,
        "ex7": 43,
        "ex8": 54,
        "ex9": 34,
        "ex10": 23,
        "openid": "test"
    },

    chestMaximum: 5,//宝箱最大存在数量
    eachSecond: 100,
    eachGemstone: 1,
    chestInfo: {
        "c1": {
            "gold": {
                "min": 100,
                "max": 500
            },
            "card": {
                "ordi": {
                    "min": 5,
                    "max": 10
                },
                "rare": {
                    "min": 0,
                    "max": 1
                },
                "epic": {
                    "min": 0,
                    "max": 0
                }
            },
            "overTime": 1800,
            "name": "白银宝箱"
        },
        "c2": {
            "gold": {
                "min": 1000,
                "max": 5000
            },
            "card": {
                "ordi": {
                    "min": 50,
                    "max": 100
                },
                "rare": {
                    "min": 0,
                    "max": 10
                },
                "epic": {
                    "min": 10,
                    "max": 100
                }
            },
            "overTime": 3600,
            "name": "钻石宝箱"
        },
        "c3": {
            "gold": {
                "min": 10000,
                "max": 50000
            },
            "card": {
                "ordi": {
                    "min": 500,
                    "max": 1000
                },
                "rare": {
                    "min": 10,
                    "max": 100
                },
                "epic": {
                    "min": 100,
                    "max": 1000
                }
            },
            "overTime": 7200,
            "name": "稀有宝箱"
        },
        "c4": {
            "gold": {
                "min": 100,
                "max": 500
            },
            "card": {
                "ordi": {
                    "min": 5,
                    "max": 10
                },
                "rare": {
                    "min": 0,
                    "max": 1
                },
                "epic": {
                    "min": 0,
                    "max": 0
                }
            },
            "overTime": 5,
            "name": "史诗宝箱"
        }
    },

    alert: function (obj) {

        var node = cc.instantiate(this.rootAlert);
        node.getChildByName('Background').on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });
        node.getChildByName('TreasureBox4').getChildByName('Title').getComponent(cc.Label).string = obj.title;
        node.getChildByName('TreasureBox4').getChildByName('GreenButton').getChildByName('Text').getComponent(cc.Label).string = obj.button;
        node.getChildByName('TreasureBox4').getChildByName('scrollview').getChildByName('view').getChildByName('content').getChildByName('Text').getComponent(cc.Label).string = obj.content;
        node.getChildByName('TreasureBox4').getChildByName('WhiteButton').on(cc.Node.EventType.TOUCH_END, function () {
            obj.back();
            node.destroy();
        });
        node.getChildByName('TreasureBox4').getChildByName('GreenButton').on(cc.Node.EventType.TOUCH_END, function () {
            obj.ok();
            node.destroy();
        });
        node.parent = cc.find('Canvas/Alert');
    },


    alertt: function (obj) {
        var node = cc.instantiate(this.alertTwo);
        node.getChildByName('Background').on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });
        node.getChildByName('TreasureBox10').getChildByName('Buttons').getChildByName('ButtonLeft').getChildByName('ButtonText').getComponent(cc.Label).string = obj.left;
        node.getChildByName('TreasureBox10').getChildByName('Buttons').getChildByName('ButtonRight').getChildByName('ButtonText').getComponent(cc.Label).string = obj.right;
        node.getChildByName('TreasureBox10').getChildByName('Buttons').getChildByName('ButtonLeft').on(cc.Node.EventType.TOUCH_END, function () {
            obj.leftClick();
            node.destroy();
        });
        node.getChildByName('TreasureBox10').getChildByName('Buttons').getChildByName('ButtonRight').on(cc.Node.EventType.TOUCH_END, function () {
            obj.rightClick();
            node.destroy();
        });
        node.getChildByName('TreasureBox10').getChildByName('Title').getComponent(cc.Label).string = obj.title;
        node.getChildByName('TreasureBox10').getChildByName('Content').getComponent(cc.Label).string = obj.content;
        node.parent = cc.find('Canvas/Alert');
    }

};
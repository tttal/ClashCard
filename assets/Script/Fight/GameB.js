var root = require('Root');
cc.Class({
    extends: cc.Component,

    properties: {
        copy: null,
    },
    onLoad() {
        var sun = this;
        sun.node.on(cc.Node.EventType.CHILD_ADDED, function (event) {
            if (event.getComponent('Role').self) {
                event.getComponent('Role').monitor();
                // var copy = cc.instantiate(event);
                // copy.setPosition(copy.x, -copy.y);
                // copy.getComponent('Role').self = !1;
                // copy.parent = cc.find('Canvas/Game/GameB');
            }

        }, this);
    },
    start() {
        root.left = -340;
        root.center = -340;
        root.bottom = -340;
    },
    update(dt) {
        var sun = this;
        sun.node.children.forEach(function (key) {
            if (key.getComponent('Role')) {
                if (key.getComponent('Role').self) {
                    switch (key.x) {
                        case -145:
                            if (key.y > root.left && key.y <= 0) {
                                root.left = key.y;
                            }
                            break;
                        case 0:
                            if (key.y > root.center && key.y <= 0) {
                                root.center = key.y;
                            }
                            break;
                        case 145:
                            if (key.y > root.right && key.y <= 0) {
                                root.right = key.y;
                            }
                            break;

                        default:
                            break;
                    }
                }
            }
            if (key.getComponent('RoleB')) {
                if (key.getComponent('RoleB').self == false) {
                    switch (key.x) {
                        case -145:
                            var bleft = key.y;
                            break;
                        case 0:
                            var bcenter = key.y;
                            break;
                        case 145:
                            var bright = key.y;
                            break;

                        default:
                            break;
                    }
                }
            }
            if (bleft < root.left) {
                root.left = bleft;
            }

            if (bcenter < root.center) {
                root.center = bcenter;
            }

            if (bright < root.right) {
                root.right = bright;
            }

        });
        cc.find('Canvas/Game/Road/Left/Game5').y = root.left;
        cc.find('Canvas/Game/Road/Center/Game5').y = root.center;
        cc.find('Canvas/Game/Road/Right/Game5').y = root.right;
    },
});

cc.Class({
    extends: cc.Component,
    properties: {
        role001: {
            default: null,
            type: cc.Prefab,
            displayName: '三兄弟',
        },
        role002: {
            default: null,
            type: cc.Prefab,
            displayName: '牛头怪',
        },
        role003: {
            default: null,
            type: cc.Prefab,
            displayName: '兽人',
        },
        role004: {
            default: null,
            type: cc.Prefab,
            displayName: '天使',
        },
        role005: {
            default: null,
            type: cc.Prefab,
            displayName: '猎人',
        },
        role006: {
            default: null,
            type: cc.Prefab,
            displayName: '女法师',
        },
        role007: {
            default: null,
            type: cc.Prefab,
            displayName: '小丑女',
        },
        role008: {
            default: null,
            type: cc.Prefab,
            displayName: '精灵弩手',
        },
        role009: {
            default: null,
            type: cc.Prefab,
            displayName: '绵羊',
        },
        role010: {
            default: null,
            type: cc.Prefab,
            displayName: '雪怪',
        },
    },
    start() {

    },
    /**
     * 
     * @param *角色ID id 
     * @param *创建的方向 direction 
     */
    specifyIDAndDirectionToCreateRoles(id, direction, positionY, grade) {
        var sun = cc.find('Canvas').getComponent('CentralNervousSystem');
        switch (id) {
            case 1:
                var role = cc.instantiate(sun.role001);
                break;
            case 2:
                var role = cc.instantiate(sun.role002);
                break;
            case 3:
                var role = cc.instantiate(sun.role003);
                break;
            case 4:
                var role = cc.instantiate(sun.role004);
                break;
            case 5:
                var role = cc.instantiate(sun.role005);
                break;
            case 6:
                var role = cc.instantiate(sun.role006);
                break;
            case 7:
                var role = cc.instantiate(sun.role007);
                break;
            case 8:
                var role = cc.instantiate(sun.role008);
                break;
            case 9:
                var role = cc.instantiate(sun.role009);
                break;
            case 10:
                var role = cc.instantiate(sun.role010);
                break;
            default:
                break;
        }
        switch (direction) {
            case 'left':
                var positionX = -145;
                break;
            case 'center':
                var positionX = 0;
                break;
            case 'right':
                var positionX = 145;
                break;
            default:
                break;
        }
        role.parent = cc.find('Canvas/Game/GameB');
        role._grade = grade;
        role.setPosition(positionX, positionY);
    },
});

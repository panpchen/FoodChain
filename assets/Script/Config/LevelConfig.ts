// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const LevelList = [
    {
        id: 0,
        cardList: [10, 12], // 正确答案的卡
        delList: [8, 11]  //   排除的卡，界面已展示
    },
    {
        id: 1,
        cardList: [0, 3],
        delList: [1, 4, 5, 7]
    },
    {
        id: 2,
        cardList: [2, 9, 14],
        delList: [6, 8, 13]
    },
    {
        id: 3,
        cardList: [17, 18, 21],
        delList: [15, 16, 19, 20]
    }
]

export class LevelConfig {
    static getConfigByLevel(level) {
        return LevelList[level - 1];
    }

    static getConfigList() {
        return LevelList;
    }

    static itemAtlas: cc.SpriteAtlas;
}


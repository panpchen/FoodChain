// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "../Game";
import { UIManager, UIType } from "../UIManager";
import { Utils } from "../Utils";
import BaseUI from "./BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultUI extends BaseUI {
    @property(cc.Label)
    totalTimeLabel: cc.Label = null;

    init() {
        const time = Game.instance.getAllGameTime();
        this.totalTimeLabel.string = `总用时：${Utils.countDownFormat(time)}`;
    }

    clickBackGame() {
        UIManager.instance.hideAll();
        UIManager.instance.showUI(UIType.MenuUI);
    }
}

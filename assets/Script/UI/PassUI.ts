// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "../Game";
import { Utils } from "../Utils";
import PopBaseUI from "./PopBaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PassUI extends PopBaseUI {
  @property(cc.Label)
  title: cc.Label = null;

  init(data) {
    const time = Utils.countDownFormat(data.gameTime);
    this.title.string = `用时：${time}`;
  }

  onClickNextLevel() {
    this.hide();
    cc.director.emit("GAME_NEXTLEVEL");
  }
}

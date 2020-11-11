// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseUI from "./BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class IntroUI extends BaseUI {
  @property(cc.Button)
  button: cc.Button = null;

  private _lastCallback = null;

  init(data) {
    this._setClickEvent(data);
  }

  _setClickEvent(callback) {
    this.button.node.off("click", this._lastCallback, this);

    let func = () => {
      this.hide();
    };

    if (callback) {
      func = callback;
    }
    this._lastCallback = func;

    this.button.node.on("click", func, this);
  }
}

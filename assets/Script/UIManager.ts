// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseUI from "./UI/BaseUI";

const { ccclass, property } = cc._decorator;
export const enum UIType {
  MenuUI = "MenuUI",
  IntroUI = "IntroUI",
  ResultUI = "ResultUI",
  PassUI = "PassUI"
}

@ccclass
export class UIManager extends cc.Component {

  public static instance: UIManager = null;
  private _allPanel = new Map<string, BaseUI>();

  @property(cc.Node)
  allUI: cc.Node[] = [];

  onLoad() {
    UIManager.instance = this;
    this._init();
  }

  _init() {
    for (let i = 0; i < this.allUI.length; i++) {
      const ui = this.allUI[i].getComponent(BaseUI);
      this._allPanel.set(ui.node.name, ui);
      ui.node.active = false;
    }
    this.showUI(UIType.MenuUI);
  }

  showUI(type: UIType, data?) {
    if (this._allPanel.size == 0) {
      return;
    }
    const panel = this._allPanel.get(type);
    panel.show(data);
  }

  hideUI(type: UIType) {
    if (this._allPanel.size == 0) {
      return;
    }
    const panel = this._allPanel.get(type);
    panel.hide();
  }

  hideAll() {
    if (this._allPanel.size == 0) {
      return;
    }

    this._allPanel.forEach((value, key) => {
      value.hide();
    });
  }
}

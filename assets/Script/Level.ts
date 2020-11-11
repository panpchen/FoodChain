// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BottomBar from "./BottomBar";
import Card from "./Card";
import { LevelConfig } from "./Config/LevelConfig";
import Game from "./Game";
import { UIManager, UIType } from "./UIManager";
import { Utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass("ShowItem")
class ShowItem {
  @property(cc.Integer)
  itemId: number = 0;
  @property(cc.Sprite)
  itemSp: cc.Sprite = null;
}

@ccclass
export default class Level extends cc.Component {
  @property(BottomBar)
  bottomBar: BottomBar = null;
  @property(cc.Node)
  targetPoint: cc.Node[] = [];
  @property(ShowItem)
  showItems: ShowItem[] = [];

  private _curCompleteCount: number = 0;
  private _gameTime: number = 0; // seconds

  onEnable() {
    cc.director.on("TAKE_IN_SLOT", this._onTakeInSlot.bind(this), this);
  }

  onDisable() {
    cc.director.off("TAKE_IN_SLOT");
  }

  init() {
    this.unscheduleAllCallbacks();
    this._curCompleteCount = 0;
    this._gameTime = 0;

    // 随机分配不重复颜色
    const len = this.targetPoint.length;
    const randomList = Utils.getRandomArrayNoRepeat(1, 4, len);
    this.targetPoint.forEach((target, index) => {
      target.getComponent(cc.Sprite).spriteFrame = LevelConfig.itemAtlas.getSpriteFrame(`${randomList[index]}`);
    });

    this.bottomBar.init(this);
    this.schedule(() => {
      this._gameTime++
    }, 1);
  }

  getGameTime() {
    return this._gameTime;
  }

  _onTakeInSlot(card: Card, item: cc.Node) {
    let isSame = false;
    for (let i = 0; i < this.showItems.length; i++) {
      const showItem = this.showItems[i];
      if (this._isSame(showItem, item, card)) {
        showItem.itemSp.spriteFrame = LevelConfig.itemAtlas.getSpriteFrame(`item_${card.getCardId()}`);
        cc.tween(showItem.itemSp.node)
          .to(0.2, { scale: 1.2 })
          .to(0.2, { scale: 1 })
          .start();
        card.node.active = false;
        this._curCompleteCount++;
        if (this._curCompleteCount == this.targetPoint.length) {
          this.unscheduleAllCallbacks();
          this.scheduleOnce(() => {
            UIManager.instance.showUI(UIType.PassUI, { gameTime: this._gameTime });
          }, 1);
        }
        isSame = true;
        break;
      }
    }

    if (!isSame) {
      cc.tween(item)
        .repeat(2,
          cc.tween()
            .to(0.2, { color: cc.color().fromHEX("#FFC0C0") })
            .to(0.2, { color: cc.Color.WHITE }))
        .start();
    }
  }

  _isSame(showItem, item, card) {
    return showItem.itemSp.node.position.equals(item.position) && showItem.itemId == card.getCardId()
  }
}

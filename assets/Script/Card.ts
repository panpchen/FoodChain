// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { LevelConfig } from "./Config/LevelConfig";
import Game from "./Game";
import Level from "./Level";
import { Utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Card extends cc.Component {
  @property(cc.Sprite)
  bg: cc.Sprite = null;

  private _currPos: cc.Vec2;
  private _cardId: number = 0;
  private _curLevel: Level = null;

  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onMoveEvt, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this._onEndEvt, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onEndEvt, this);
  }

  init(level: Level, cardId) {
    this._curLevel = level;
    this.setCardId(cardId);
    this.bg.spriteFrame = LevelConfig.itemAtlas.getSpriteFrame(`item_${this._cardId}`);
  }

  _onMoveEvt(evt: cc.Event.EventTouch) {
    this._currPos = evt.getLocation();
    const newCard: Card = Game.instance.getNewCard();
    if (!newCard) {
      const startPos = evt.getStartLocation();
      const deltaY = Math.abs(this._currPos.y - startPos.y);
      if (deltaY > 150) {
        this._curLevel.bottomBar.setScrollViewEnable(false);
        this._addNewFruit();
      }
    } else {
      newCard.node.active = true;
      Game.instance.followNewCard(newCard, this._currPos);
    }
  }

  _addNewFruit() {
    if (Game.instance.node) {
      const newCard: Card = cc.instantiate(this.node).getComponent(Card);
      newCard.setCardId(this._cardId);
      Game.instance.setNewCard(newCard);
      newCard.node.parent = Game.instance.node;
      newCard.node.active = false;
    }
  }

  _onEndEvt(evt: cc.Event.EventTouch) {
    let newCard = Game.instance.getNewCard();
    if (newCard) {
      for (let i = 0; i < this._curLevel.targetPoint.length; i++) {
        const item = this._curLevel.targetPoint[i];
        const curPos = Utils.worldConvertLocalPointAR(item, this._currPos);
        curPos.x = Math.abs(curPos.x);
        curPos.y = Math.abs(curPos.y);

        if (curPos.x < 100 && curPos.y < 100) {
          cc.director.emit("TAKE_IN_SLOT", this, item);
          break;
        }
      }
      newCard.node.active = false;
      newCard.destroy();
      newCard = null;
      Game.instance.setNewCard(null);
      this._curLevel.bottomBar.setScrollViewEnable(true);
    }
  }

  setCardId(cardId) {
    this._cardId = cardId;
  }

  getCardId() {
    return this._cardId;
  }

}

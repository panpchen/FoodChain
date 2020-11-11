// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Card from "./Card";
import { LevelConfig } from "./Config/LevelConfig";
import Game from "./Game";
import Level from "./Level";
import { Utils } from "./Utils";

const { ccclass, property } = cc._decorator;
// 界面展示的卡数
const SHOWNUM: number = 5;

@ccclass
export default class BottomBar extends cc.Component {
  @property(cc.Prefab)
  cardPrefab: cc.Prefab = null;
  @property(cc.ScrollView)
  scrollView: cc.ScrollView = null;

  private _cardList: Card[] = [];
  private _level: Level = null;
  private _answerCardList: number[] = [];

  init(level: Level) {
    this._level = level;
    if (this._answerCardList.length == 0) {
      this._answerCardList = LevelConfig.getConfigByLevel(Game.instance.getCurLevel()).cardList;
    }
    let randomRangeList = Utils.getRandomArrayNoRepeat(0, 21, SHOWNUM);
    const delList = LevelConfig.getConfigByLevel(Game.instance.getCurLevel()).delList;
    const isRepeat = () => {
      for (let i = 0; i < randomRangeList.length; i++) {
        for (let j = 0; j < delList.length; j++) {
          if (randomRangeList[i] == delList[j]) {
            randomRangeList[i] = Utils.getRangeRandomInteger(0, 21);
            isRepeat();
          }
        }
      }
    }
    isRepeat();
    let mergeArr = this._answerCardList.concat(randomRangeList);
    let newCardList = Utils.getUniqueArray(mergeArr);
    if (newCardList.length > SHOWNUM) {
      const n = this._answerCardList.length;
      const len = newCardList.length - SHOWNUM;
      newCardList.splice(n, len);
    }

    newCardList = Utils.getRandomList(newCardList);
    if (this._cardList.length > 0) {
      this._cardList.forEach((card, index) => {
        card.init(this._level, newCardList[index]);
        card.node.active = true;
      });
      return;
    }

    for (let i = 0; i < newCardList.length; i++) {
      const card = cc.instantiate(this.cardPrefab).getComponent(Card);
      card.node.parent = this.scrollView.content;
      card.init(this._level, newCardList[i]);
      this._cardList.push(card);
    }
  }

  setScrollViewEnable(isEnable) {
    this.scrollView.enabled = isEnable;
  }
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Card from "./Card";
import { LevelConfig } from "./Config/LevelConfig";
import Level from "./Level";
import { UIManager, UIType } from "./UIManager";
import { Utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
  @property(cc.Node)
  guidePanel: cc.Node = null;
  @property(cc.Node)
  levelParent: cc.Node = null;
  @property(cc.Prefab)
  levelPrefabs: cc.Prefab[] = [];
  @property(cc.SpriteAtlas)
  itemAtlas: cc.SpriteAtlas = null;

  public static instance: Game = null;
  private _curLevel: number = 0;
  private _newCard: Card = null;
  private _haveLevelList: cc.Node[] = [];

  onLoad() {
    Game.instance = this;
    LevelConfig.itemAtlas = this.itemAtlas;
    cc.director.on("GAME_START", this._startGame.bind(this));
    cc.director.on("GAME_NEXTLEVEL", this._onNextLevel.bind(this));
  }

  start() {
    this.guidePanel.active = true;
  }

  _startGame() {
    this._curLevel = 0;
    this._haveLevelList.forEach(level => {
      level.active = false;
    });
    this._loadLevel();
  }

  _onNextLevel() {
    if (this._curLevel + 1 >= LevelConfig.getConfigList().length) {
      UIManager.instance.showUI(UIType.ResultUI);
      return;
    }

    this._haveLevelList[this._curLevel].active = false;
    this._curLevel++;
    this._loadLevel();
  }

  _loadLevel() {
    let level = this._haveLevelList[this._curLevel];
    if (!level) {
      level = cc.instantiate(this.levelPrefabs[this._curLevel]);
      this._haveLevelList.push(level);
      level.parent = this.levelParent;
    } else {
      level.active = true;
    }
    level.getComponent(Level).init();
  }

  getCurLevel() {
    return this._curLevel + 1;
  }

  setNewCard(card: Card) {
    this._newCard = card;
  }

  getNewCard() {
    return this._newCard;
  }

  followNewCard(newCard: Card, touchPos: cc.Vec2) {
    const localPos = Utils.worldConvertLocalPointAR(this.node, touchPos);
    newCard.node.setPosition(localPos);
  }

  onClickEvent(event, parm) {
    if (parm == "hideGuide") {
      this.guidePanel.active = false;
    }
  }

  getAllGameTime() {
    let time = 0;
    this._haveLevelList.forEach(level => {
      time += level.getComponent(Level).getGameTime();
    });
    return time;
  }
}
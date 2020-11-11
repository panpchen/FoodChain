import { Utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

  @property(cc.Label)
  label: cc.Label = null;
  @property(cc.Node)
  greenGirds: cc.Node = null;

  private _greenGirds: cc.Node[] = [];

  onLoad() {
    cc.macro.ENABLE_MULTI_TOUCH = false;
    const manager = cc.director.getCollisionManager();
    manager.enabled = true;
    // manager.enabledDebugDraw = true;
    this.preloadGameScene();
  }

  start() {
    this._greenGirds = this.greenGirds.children;
  }

  preloadGameScene() {
    cc.director.preloadScene('game', (completeCount, totalCount, item) => {
      let v = completeCount / totalCount;
      this.label.string = `${Math.floor(v * 100)}%`;
      v = Math.floor(v * 10);
      for (let i = 0, len = this._greenGirds.length; i < len; i++) {
        if (i <= v) {
          this._greenGirds[i].active = true;
        }
      }
    }, () => {
      cc.director.loadScene("game");
      cc.log('game scene preloaded');
    });
  }
}

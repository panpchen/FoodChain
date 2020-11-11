// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NodePool } from "./NodePool";


const { ccclass, property } = cc._decorator;

@ccclass
export default class PoolMng extends cc.Component {
  @property(NodePool)
  scorePool: NodePool = null;

  init() {
    this.scorePool.init();
  }

  createItems() {
  }

  returnItemsPool(node) {
  }

  showScore() {
    return this.scorePool.requestPool();
  }

  returnScorePool(node) {
    this.scorePool.returnPool(node);
  }
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseUI from "./BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PopBaseUI extends BaseUI {
    @property(cc.Node)
    mask: cc.Node = null;
    @property(cc.Node)
    panel: cc.Node = null;

    show(data = null) {
        this.init(data);
        this.playAni();
        this.node.active = true;
        if (this.mask) {
            this.mask.opacity = 0;
            cc.tween(this.mask)
                .to(0.2, { opacity: 150 })
                .start();
        }

        if (this.panel) {
            this.panel.scale = 0;
            cc.tween(this.panel)
                .to(0.15, { scale: 1.12 }, { easing: 'sineOut' })
                .to(0.15, { scale: 1 })
                .start();
        }
    }

    hide() {
        if (this.mask) {
            this.mask.opacity = 0;
        }
        this.node.active = false;
    }
}

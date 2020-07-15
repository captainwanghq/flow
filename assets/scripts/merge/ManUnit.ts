import { _decorator, Component, Node, LabelComponent, SpriteComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ManUnit')
export class ManUnit extends Component {
    mSite = 0;
    start () {
        let sp = this.getComponentInChildren(SpriteComponent);
    }
    updateItem(data)
    {
        this.mSite = data.site;
        let lv = this.getComponentInChildren(LabelComponent);
        lv.string = data.level.toString();
    }
    // update (dt) {}
}

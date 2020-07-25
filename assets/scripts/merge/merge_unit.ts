import { _decorator, Component, LabelComponent, SpriteComponent, SpriteFrame, loader, Texture2D } from 'cc';
import util from '../base/util'
const { ccclass, property } = _decorator;

@ccclass('merge_unit')
export class merge_unit extends Component {
    _site = 0;
    _data = null;
    start () {
    }
    update_item(data)
    {
        this._site = data.site;
        this._data = data;
        let lv = this.getComponentInChildren(LabelComponent);
        lv.string = data.level.toString();
        let path = `icon/${util.prefix_integer(data.level)}/texture`
        util.load_sprite(path,this.node.getComponentInChildren(SpriteComponent))
    }
    get_data()
    {
        return this._data
    }
}



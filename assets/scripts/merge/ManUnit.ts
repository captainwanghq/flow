import { _decorator, Component, Node, LabelComponent, SpriteComponent, SpriteFrame, loader, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ManUnit')
export class ManUnit extends Component {
    _site = 0;
    _data = null;
    start () {
    }
    updateItem(data)
    {
        this._site = data.site;
        this._data = data;
        let lv = this.getComponentInChildren(LabelComponent);
        lv.string = data.level.toString();
        let path = `icon/${data.level}/texture`
        if (data.level < 10 )
        {
            path = `icon/0${data.level}/texture`
        }
  
        loader.loadRes(path, Texture2D ,(err: any, texture: Texture2D) => {
            const spriteFrame = new SpriteFrame()
            spriteFrame.texture = texture;
            this.node.getComponentInChildren(SpriteComponent).spriteFrame = spriteFrame;
        });  
    }
    // update (dt) {}
}



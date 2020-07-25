import { _decorator, Component, LabelComponent, SpriteComponent, SpriteFrame, loader, Texture2D } from 'cc';
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
        let path = `icon/${data.level}/texture`
        if (data.level < 10 )
        {
            path = `icon/0${data.level}/texture`
        }

        const texture =  loader.getRes(path,Texture2D)
        if(texture)
        {
            const spriteFrame = new SpriteFrame()
            spriteFrame.texture = texture;
            this.node.getComponentInChildren(SpriteComponent).spriteFrame = spriteFrame;
        }
        else{
            loader.loadRes(path, Texture2D ,(err: any, texture: Texture2D) => {
                if(err==null)
                {
                    const spriteFrame = new SpriteFrame()
                    spriteFrame.texture = texture;
                    this.node.getComponentInChildren(SpriteComponent).spriteFrame = spriteFrame;
                }
            });  
        }
 
    }
    get_data()
    {
        return this._data
    }
}



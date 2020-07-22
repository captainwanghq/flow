import { _decorator, Component, SpriteFrame, SpriteComponent, LabelComponent, loader, Texture2D } from 'cc';
import { list_item } from '../base/components/list_item';
import { data_mgr } from '../data/data_mgr';
import event_mgr from '../base/event/event_mgr';
const { ccclass, property } = _decorator;

@ccclass('shop_car_item')
export class shop_car_item extends Component {
    @property(SpriteComponent)
    car_icon:SpriteComponent=null

    @property(LabelComponent)
    car_level:LabelComponent=null
    
    start () {
        this.update_item()
        event_mgr.instance.on("","scroll_view",this.update_item,this)
    }

    update_item()
    {
        let data = this.getComponent(list_item).get_data().data
        this.car_level.string = `${data.level}`
        let path = `icon/${data.level}/texture`
        if (data.level < 10 )
        {
            path = `icon/0${data.level}/texture`
        }

        const texture = loader.getRes(path,Texture2D)
        if(texture)
        {
            const spriteFrame = new SpriteFrame()
            spriteFrame.texture = texture;
            this.car_icon.spriteFrame = spriteFrame;
            return 
        }
        loader.loadRes(path, Texture2D ,(err: any, texture: Texture2D) => {
            const spriteFrame = new SpriteFrame()
            spriteFrame.texture = texture;
            this.car_icon.spriteFrame = spriteFrame;
        }); 
    }
}

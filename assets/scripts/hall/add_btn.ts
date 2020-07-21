import { _decorator, Component, Node, SpriteComponent, LabelComponent, Texture2D, loader, SpriteFrame } from 'cc';
import { merge_mgr } from '../data/merge_mgr';
import { shop_mgr } from '../data/shop_mgr';
import event_mgr from '../base/event/event_mgr';
import util from '../base/util';

const { ccclass, property } = _decorator;

@ccclass('add_btn')
export class add_btn extends Component {
    @property(SpriteComponent)
    car_icon:SpriteComponent =null
    @property(LabelComponent)
    car_price:LabelComponent =null
    buy_cfg =null
    start () {
        this.update_car()
        event_mgr.getInstance().on("","buy_car",this.update_car,this)
    }

    on_click_add()
    {
        shop_mgr.getInstance().buy_car(this.buy_cfg,0)
    }

    private update_car()
    {
        const data =  merge_mgr.instance.recommend()
        this.buy_cfg = data
        let smart_price= util.to_smart_string(shop_mgr.getInstance().get_price(data.level))
        this.car_price.string= `${smart_price}`
        let path = `icon/${data.level}/texture`
        if (data.level < 10 )
        {
            path = `icon/0${data.level}/texture`
        }
        loader.loadRes(path, Texture2D ,(err: any, texture: Texture2D) => {
            const spriteFrame = new SpriteFrame()
            spriteFrame.texture = texture;
            this.car_icon.spriteFrame = spriteFrame;
        }); 
    }
}

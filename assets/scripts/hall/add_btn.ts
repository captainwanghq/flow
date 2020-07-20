import { _decorator, Component, Node, SpriteComponent, LabelComponent, Texture2D, loader, SpriteFrame } from 'cc';
import { merge_mgr } from '../data/merge_mgr';
import { shop_mgr } from '../data/shop_mgr';

const { ccclass, property } = _decorator;

@ccclass('add_btn')
export class add_btn extends Component {
    @property(SpriteComponent)
    car_icon:SpriteComponent =null
    @property(LabelComponent)
    car_price:LabelComponent =null
    buy_cfg =null
    start () {
       const data =  merge_mgr.instance.recommend()
       this.buy_cfg = data
       this.car_price.string= shop_mgr.getInstance().get_price(data.level)
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

    onClickAdd()
    {
        shop_mgr.getInstance().buyCar(this.buy_cfg,0)
    }
}
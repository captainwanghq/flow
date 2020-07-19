import { _decorator, Component, Node, SpriteComponent, LabelComponent, Texture2D, loader, SpriteFrame } from 'cc';
import { merge_mgr } from '../data/MergeMgr';
import { ShopMgr } from '../data/ShopMgr';

const { ccclass, property } = _decorator;

@ccclass('AddBtn')
export class AddBtn extends Component {
    @property(SpriteComponent)
    carIcon:SpriteComponent =null
    @property(LabelComponent)
    carPrice:LabelComponent =null
    buy_cfg =null
    start () {
       const data =  merge_mgr.instance.recommend()
       this.buy_cfg = data
       this.carPrice.string= ShopMgr.getInstance().getPrice(data.level)
       let path = `icon/${data.level}/texture`
       if (data.level < 10 )
       {
           path = `icon/0${data.level}/texture`
       }
       
       loader.loadRes(path, Texture2D ,(err: any, texture: Texture2D) => {
           const spriteFrame = new SpriteFrame()
           spriteFrame.texture = texture;
           this.carIcon.spriteFrame = spriteFrame;
       }); 
    }

    onClickAdd()
    {
        ShopMgr.getInstance().buyCar(this.buy_cfg,0)
    }
}

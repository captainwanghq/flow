import { _decorator, Component, Node, SpriteComponent, LabelComponent, Texture2D, loader, SpriteFrame } from 'cc';
import { MergeMgr } from '../data/MergeMgr';

const { ccclass, property } = _decorator;

@ccclass('AddBtn')
export class AddBtn extends Component {
    @property(SpriteComponent)
    carIcon:SpriteComponent =null
    @property(LabelComponent)
    carPrice:LabelComponent =null

    start () {
       const data =  MergeMgr.getInstance().recommendCar()
       this.carPrice.string= data.buy_gold
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
}

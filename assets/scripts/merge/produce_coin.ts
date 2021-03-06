import { _decorator, Component, LabelComponent, tween, Vec3 } from 'cc';
import { cfg_mgr } from '../data/cfg_mgr';
import { merge_unit } from './merge_unit';
import { data_mgr } from '../data/data_mgr';
const { ccclass, property } = _decorator;

@ccclass('produce_coin')
export class produce_coin extends Component {
    
    private _timeCount:number = 0
    private _startPos:Vec3 =  new Vec3(0,0,0)
    start () {
        // Your initialization goes here.
        let textIncome = this.node.getChildByName("txtIncome")
        this._startPos = new Vec3(textIncome.position)
        
    }

    update (deltaTime: number) {
  
       let level = this.getComponent(merge_unit)._data.level;
       let cfg =  cfg_mgr.getInstance().get_car(level);
     
       if(cfg!=null)
       {
           this._timeCount+=deltaTime*1000;
           if(this._timeCount>cfg.gold_interval)
           {
               this._timeCount -= cfg.gold_interval;
               let textIncome = this.node.getChildByName("txtIncome")
               textIncome.getComponent(LabelComponent).string = cfg.output_gold
               textIncome.active = true
               let pos = this._startPos
               let nPos = new Vec3(pos.x,pos.y+80,pos.z)
               textIncome.position = this._startPos
               
               tween(textIncome).to(0.5,{position:nPos}).call(()=>{
                   // textIncome.position = this._startPos
                    textIncome.active = false
                    data_mgr.getInstance().add_money(cfg.output_gold)
               }).start()
           }
       }
    }
}

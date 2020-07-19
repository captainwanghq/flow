import { _decorator, Component, LabelComponent, tween, Vec3 } from 'cc';
import { CfgMgr } from '../data/CfgMgr';
import { ManUnit } from './ManUnit';
import { DataMgr } from '../data/DataMgr';
const { ccclass, property } = _decorator;

@ccclass('ProduceCoin')
export class ProduceCoin extends Component {
    
    private _timeCount:number = 0
    private _startPos:Vec3 =  new Vec3(0,0,0)
    start () {
        // Your initialization goes here.
        let textIncome = this.node.getChildByName("txtIncome")
        this._startPos = new Vec3(textIncome.position)
        
    }

    update (deltaTime: number) {
  
       let level = this.getComponent(ManUnit)._data.level;
       let cfg =  CfgMgr.getInstance().getCar(level);
     
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
                    DataMgr.getInstance().addMoney(cfg.output_gold)
               }).start()
           }
       }
    }
}

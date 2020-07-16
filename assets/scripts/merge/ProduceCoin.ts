import { _decorator, Component, Node, LabelComponent } from 'cc';
import { CfgMgr } from '../data/CfgMgr';
import { ManUnit } from './ManUnit';
const { ccclass, property } = _decorator;

@ccclass('ProduceCoin')
export class ProduceCoin extends Component {
    
    private _timeCount:number = 0
    start () {
        // Your initialization goes here.
    }

    update (deltaTime: number) {
  
       let level = this.getComponent(ManUnit)._data.level;
       let cfg =  CfgMgr.getInstance().getCar(level);
       console.log(level,cfg)
       if(cfg!=null)
       {
            this._timeCount++;
           if(this._timeCount>cfg.output_gold_second*60/1000)
           {
               this._timeCount = 0;
               let textIncome = this.node.getChildByName("txtIncome")
               textIncome.getComponent(LabelComponent).string = cfg.output_gold
               textIncome.active = true
           }
       }

    }
}

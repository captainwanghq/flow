import { _decorator, Component, Node, LabelComponent } from 'cc';
import { merge_mgr } from '../data/merge_mgr';
import event_mgr from '../base/event/event_mgr';

import util from "../base/util"
const { ccclass, property } = _decorator;

@ccclass('AllIncome')
export class AllIncome extends Component {
    start () {
        this.update_income()
        event_mgr.instance.on("","updatemoney",this.update_income,this)
    }
    update_income()
    {
        let income = merge_mgr.instance.get_income_per_second()
        let smart_income = util.to_smart_string(income)
        this.getComponent(LabelComponent).string = `${smart_income}/s`
    }
 
}

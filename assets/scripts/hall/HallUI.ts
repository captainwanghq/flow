import { _decorator, Component, Node, LabelComponent } from 'cc';
import { DataMgr } from '../data/DataMgr';
import { CfgMgr } from '../data/CfgMgr';
import { ShopMgr } from '../data/ShopMgr';
import { merge_mgr } from '../data/MergeMgr';
import EventMgr from '../base/event/EventMgr';
const { ccclass, property } = _decorator;

@ccclass('HallUI')
export class HallUI extends Component {
    @property(Node)
    moneyNode:Node = null
    onLoad()
    {
        CfgMgr.getInstance()
        DataMgr.getInstance()
        ShopMgr.getInstance().start()
        merge_mgr.getInstance().start()
    }
    start () {
        // Your initialization goes here.
        this.updateMoney()
        EventMgr.getInstance().on("","updatemoney",this.updateMoney,this)
    }
    updateMoney()
    {
        let money  = DataMgr.getInstance().getMoney()
        this.moneyNode.getComponent(LabelComponent).string= money.toString()
    }
    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}

import { _decorator, Component, Node, LabelComponent } from 'cc';
import { DataMgr } from '../data/DataMgr';
import { CfgMgr } from '../data/CfgMgr';
import { ShopMgr } from '../data/ShopMgr';
import { MergeMgr } from '../data/MergeMgr';
const { ccclass, property } = _decorator;

@ccclass('HallUI')
export class HallUI extends Component {
    @property(Node)
    moneyNode:Node = null
    onLoad()
    {
        CfgMgr.getInstance()
        DataMgr.getInstance()
        ShopMgr.getInstance()
        MergeMgr.getInstance()
    }
    start () {
        // Your initialization goes here.
        let money  = DataMgr.getInstance().getMoney()
        this.moneyNode.getComponent(LabelComponent).string= money.toString()
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}

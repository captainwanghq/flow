import { _decorator, Component, Node, LabelComponent } from 'cc';
import { data_mgr } from '../data/data_mgr';
import { cfg_mgr } from '../data/cfg_mgr';
import { shop_mgr } from '../data/shop_mgr';
import { merge_mgr } from '../data/merge_mgr';
import event_mgr from '../base/event/event_mgr';
const { ccclass, property } = _decorator;

@ccclass('hall_ui')
export class hall_ui extends Component {
    @property(Node)
    money_node:Node = null
    onLoad()
    {
        cfg_mgr.getInstance()
        data_mgr.getInstance()
        shop_mgr.getInstance().start()
        merge_mgr.getInstance().start()
    }
    start () {
        // Your initialization goes here.
        this.update_money()
        event_mgr.getInstance().on("","updatemoney",this.update_money,this)
    }
    update_money()
    {
        let money  = data_mgr.getInstance().get_money()
        this.money_node.getComponent(LabelComponent).string= money.toString()
    }
    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}

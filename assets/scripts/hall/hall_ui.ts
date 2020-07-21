import { _decorator, Component, Node, LabelComponent, tween, director } from 'cc';
import { data_mgr } from '../data/data_mgr';
import { cfg_mgr } from '../data/cfg_mgr';
import { shop_mgr } from '../data/shop_mgr';
import { merge_mgr } from '../data/merge_mgr';
import event_mgr from '../base/event/event_mgr';
import util from '../base/util';
const { ccclass, property } = _decorator;

@ccclass('hall_ui')
export class hall_ui extends Component {
    @property(Node)
    money_node:Node = null
    onLoad()
    {
        
    }
    start () {
        // Your initialization goes here.
        this.update_money()
        event_mgr.getInstance().on("","updatemoney",this.update_money,this)
    }
    update_money()
    {
        let money  = data_mgr.getInstance().get_money()
        let smart_money = util.to_smart_string(money)
        this.money_node.getComponent(LabelComponent).string= `${smart_money}`
    }
    on_click_start()
    {
        director.loadScene("flow")
    }
}

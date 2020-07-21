import { _decorator, Component, Node, LabelComponent } from 'cc';
import event_mgr from '../base/event/event_mgr';
import { data_mgr } from '../data/data_mgr';
const { ccclass, property } = _decorator;

@ccclass('user_level_update')
export class user_level_update extends Component {
    start () {
        this.update_level()
        event_mgr.instance.on("","update_user_level",this.update_level,this)
    }
    update_level()
    {
        let lev = data_mgr.instance.exp_2_level()
        this.getComponent(LabelComponent).string = `${lev}`
    }
}

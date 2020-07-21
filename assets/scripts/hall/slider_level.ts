import { _decorator, Component, Node, SpriteComponent } from 'cc';
import event_mgr from '../base/event/event_mgr';
import { data_mgr } from '../data/data_mgr';
const { ccclass, property } = _decorator;

@ccclass('slider_level')
export class slider_level extends Component {

    start () {
        // Your initialization goes here.
        this.update_slider()
        event_mgr.instance.on("","update_user_level",this.update_slider,this)
    }

     update_slider()
     {
        let slider = data_mgr.instance.get_level_slider()
        this.getComponent(SpriteComponent).fillRange = 1-slider
     }
}

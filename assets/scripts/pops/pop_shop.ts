import { _decorator, Component, Node, ButtonComponent } from 'cc';
import { pop_mgr } from '../base/pop_mgr';
const { ccclass, property } = _decorator;

@ccclass('pop_shop')
export class pop_shop extends Component {
    start () {
        // Your initialization goes here.
    }

    on_click_close()
    {
        pop_mgr.getInstance().hide()
    }
}

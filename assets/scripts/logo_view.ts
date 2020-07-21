import { _decorator, Component, Node, tween, director } from 'cc';
import { cfg_mgr } from './data/cfg_mgr';
import { data_mgr } from './data/data_mgr';
import { shop_mgr } from './data/shop_mgr';
import { merge_mgr } from './data/merge_mgr';
const { ccclass, property } = _decorator;

@ccclass('LogoView')
export class LogoView extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
        cfg_mgr.getInstance()
        data_mgr.getInstance()
        shop_mgr.getInstance().start()
        merge_mgr.getInstance().start()
        tween(this.node).delay(1).call(()=>{
            director.loadScene("hall")
        }).start()
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}

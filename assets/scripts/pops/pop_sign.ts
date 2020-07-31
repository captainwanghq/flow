import { _decorator, Component, Node } from 'cc';
import { pop_base } from '../base/pop_base';
import { pop_mgr } from '../base/pop_mgr';
const { ccclass, property } = _decorator;

@ccclass('pop_sign')
export class pop_sign extends pop_base {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    on_click_get()
    {

    }

    on_click_get_double()
    {

    }
    on_click_close()
    {
        pop_mgr.getInstance().hide()
    }
}

import { _decorator, Component, Node, LabelComponent } from 'cc';
import { data_mgr } from '../data/data_mgr';
import { pop_mgr } from '../base/pop_mgr';
import { pop_base } from '../base/pop_base';
const { ccclass, property } = _decorator;

@ccclass('pop_site')
export class pop_site extends pop_base {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
        let level = data_mgr.instance.get_user_level()
        this.node.getChildByName('txt_level').getComponent(LabelComponent).string = `${level}`
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    onShow()
    {
        let level = data_mgr.instance.get_user_level()
        this.node.getChildByName('txt_level').getComponent(LabelComponent).string = `${level}`
    }
    on_click_get()
    {
        pop_mgr.instance.hide()
    }
}

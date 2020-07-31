import { _decorator, LabelComponent, SpriteComponent } from 'cc';
import { pop_base } from '../base/pop_base';
import {merge_mgr} from '../data/merge_mgr'
import {cfg_mgr} from '../data/cfg_mgr'
import util from '../base/util'
import { pop_mgr } from '../base/pop_mgr';
const { ccclass, property } = _decorator;

@ccclass('pop_car')
export class pop_car extends pop_base {
    start () {
        this.update_info()
    }

    onShow()
    {
        this.update_info()
    }
    update_info()
    {
        let level = merge_mgr.instance.find_car_max_level()
        let cfg = cfg_mgr.instance.get_car(level)
        this.node.getChildByName('txt_level').getComponent(LabelComponent).string = `Lv.${cfg.level}`
        let path = `icon/${util.prefix_integer(level)}/texture`
        util.load_sprite(path,this.node.getChildByName('car').getComponent(SpriteComponent))
        this.node.getChildByName('txt_name').getComponent(LabelComponent).string = `${cfg.name}`

      //  this.node.getChildByName('txt_add').getComponent(LabelComponent).string = `${cfg.desccontrol*100}`

        this.node.getChildByName('txt_diamond_num').getComponent(LabelComponent).string = `x${cfg.diamond}`
    }
    on_click_get()
    {
        pop_mgr.instance.hide()
    }
}

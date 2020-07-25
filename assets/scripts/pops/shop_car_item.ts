import { _decorator, Component, SpriteFrame, SpriteComponent, LabelComponent, loader, Texture2D } from 'cc';
import { list_item } from '../base/components/list_item';
import { data_mgr } from '../data/data_mgr';
import event_mgr from '../base/event/event_mgr';
import util from '../base/util'
import { e_car_buy_type,shop_mgr } from '../data/shop_mgr';
import {pop_base} from '../base/pop_base'
const { ccclass, property } = _decorator;


@ccclass('shop_car_item')
export class shop_car_item extends pop_base {
    @property(SpriteComponent)
    car_icon:SpriteComponent=null

    @property(LabelComponent)
    car_level:LabelComponent=null
    
    start () {
        this.update_item()
        event_mgr.instance.on("","scrolling",this.update_item,this)
    }

    onShow()
    {
        this.update_item()
    }
    update_item()
    {
        let data = this.getComponent(list_item).get_data().data
        this.car_level.string = `${data.level}`
        let path = `icon/${util.prefix_integer(data.level)}/texture`
        util.load_sprite(path,this.car_icon)
        const ret = shop_mgr.instance.is_shop_unlock(data.level)
        if (ret == e_car_buy_type.locked)
        {
            this.node.getChildByName('locked').active = true
            this.node.getChildByName('btn_money').active = false
            this.node.getChildByName('btn_diamond').active = false
        }
        else if(ret == e_car_buy_type.diamond)
        {
            this.node.getChildByName('locked').active = false
            this.node.getChildByName('btn_money').active = false
            this.node.getChildByName('btn_diamond').active = true
        }
        else if(ret == e_car_buy_type.money)
        {
            this.node.getChildByName('locked').active = false
            this.node.getChildByName('btn_money').active = true
            this.node.getChildByName('btn_diamond').active = false
        }
        this.update_cost_money(data.level)
        this.update_cost_diamond(data.diamond)
    }

    udpate_discount(b:boolean)
    {

    }

    update_cost_money(lev)
    {
        const money = shop_mgr.instance.get_price(lev)
        let money_node =   this.node.getChildByName('btn_money')
        let smart_money = util.to_smart_string(money)
        money_node.getComponentInChildren(LabelComponent).string = `${smart_money}`
    }

    update_cost_diamond(num)
    {
      let diamond_node =   this.node.getChildByName('btn_diamond')
      diamond_node.getComponentInChildren(LabelComponent).string = `${num}`
    }

    on_click_money()
    {
        let data = this.getComponent(list_item).get_data().data
        shop_mgr.getInstance().buy_car(data,0)
        this.update_item()
    }
    on_click_diamond()
    {
        let data = this.getComponent(list_item).get_data().data
        shop_mgr.getInstance().buy_car(data,1)
        this.update_item()
    }
}

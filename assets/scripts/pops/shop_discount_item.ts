import { _decorator, Component, SpriteFrame, SpriteComponent, LabelComponent, loader, Texture2D } from 'cc';
import { list_item } from '../base/components/list_item';
import { data_mgr } from '../data/data_mgr';
import event_mgr from '../base/event/event_mgr';
import util from '../base/util'
import { e_car_bought_state,shop_mgr } from '../data/shop_mgr';
import {pop_base} from '../base/pop_base'
const { ccclass, property } = _decorator;


@ccclass('shop_discount_item')
export class shop_discount_item extends pop_base {
    @property(SpriteComponent)
    icon:SpriteComponent=null

    @property(LabelComponent)
    text_des:LabelComponent=null
    
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
        let path = `icon/${data.icon}/texture`
        util.load_sprite(path,this.icon)
        const ret = shop_mgr.instance.bought_state(data.type,data.level)
        if (ret ==e_car_bought_state.can_buy)
        {
            this.node.getChildByName('locked').active = false
            this.node.getChildByName('btn_money').active = true
            this.node.getChildByName('btn_diamond').active = false
            this.node.getChildByName('txt_bought').active = false
        }
        else if(ret == e_car_bought_state.locked)
        {
            this.node.getChildByName('locked').active = true
            this.node.getChildByName('btn_money').active = false
            this.node.getChildByName('btn_diamond').active = false
            this.node.getChildByName('txt_bought').active = false
        }
        else if(ret == e_car_bought_state.bought)
        {
            this.node.getChildByName('locked').active = false
            this.node.getChildByName('btn_money').active = false
            this.node.getChildByName('btn_diamond').active = false
            this.node.getChildByName('txt_bought').active = true
            
        }
        this.update_cost_money(data.price)
        this.update_discount(data.value)
        this.update_name(data.type,data.level)
        this.update_des(data.type,data.value)
    }
    update_name(type,level)
    {
        
        let txt =   this.node.getChildByName('txt_level')
        let des = ''
        if (type==1)
        {
            des = `增益卡等级${level}`
        }
        else if(type ==2)
        {
            des = `打折卡等级${level}`
        }

        txt.getComponent(LabelComponent).string = `${des}`
    }
    update_des(type,value)
    {
        
        let txt =   this.node.getChildByName('txt_des')
        let des = ''
        if (type==1)
        {
            des = `所有车辆收益增加${value}%`
        }
        else if(type ==2)
        {
            des = `所有车辆降价${value}%`
        }
        txt.getComponent(LabelComponent).string = `${des}`
    }

    update_discount(discount)
    {
        
        let txt_discount =   this.node.getChildByName('txt_discount')
        txt_discount.getComponent(LabelComponent).string = `${discount}%`
    }

    update_cost_money(price)
    {
        let money_node =   this.node.getChildByName('btn_money')
        let smart_money = util.to_smart_string(price)
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

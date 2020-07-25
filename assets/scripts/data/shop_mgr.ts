
import { cfg_mgr } from './cfg_mgr';
import { _decorator} from 'cc';
import base_mgr from '../base/base_mgr';
import { merge_mgr } from './merge_mgr';
import { data_mgr } from './data_mgr';
const { ccclass} = _decorator;

export enum e_car_bought_state
{
    can_buy = 0,
    locked = 1,
    bought = 2
}

export enum e_car_buy_type
{
    money = 0,
    diamond = 1,
    locked = 2
}
@ccclass('shop_mgr')
export class shop_mgr extends base_mgr {
    
    private  boughtGain:number = 0

    private  boughDiscount:number = 0
    
    private  buyCarsNum:number[] = new Array(50)
    start () {
      for (let id=0;id<50;id++)
      {
          this.buyCarsNum[id] = 0
      }
    }
    private get_discount_level():number
    {
        return 	this.boughDiscount
    }

    private get_gain_level():number
    {
        return this.boughtGain
    }
    public get_price(lv:number)
    {
        const cfg = cfg_mgr.getInstance().get_car(lv)
        const  value= Math.pow(cfg.add_gold,this.buyCarsNum[lv-1])
        const discount = 1- this.get_discount()/100
        return cfg.buy_gold*value*discount
    }
    public get_discount():number
    {
        let lev = this.get_discount_level()
        let shopCfg = cfg_mgr.getInstance().get_shop_cfg()
        for (let id=0;id<shopCfg.lenght;++id)
        {
            const el = shopCfg[id]
            if (el.type == 2 && el.level == lev)
            {
                return el.value
            }
        }
        return 0
    }

    public get_gain_buffer():number{
        const lev = this.get_gain_level()
        const cfg = cfg_mgr.getInstance().get_car(lev)
        if (cfg!=null)
        {
            return cfg.value
        }
        return 0
    }

    public is_shop_unlock(level:number):e_car_buy_type 
    {
        const lv = merge_mgr.getInstance().find_car_max_level()
        const cfg = cfg_mgr.getInstance().get_car(lv)
        if (level <= cfg.unlock_buy_gold_level)
        {
            return e_car_buy_type.money
        }
        if (level <= cfg.unlock_buy_diamond_level)
        {
            return e_car_buy_type.diamond
        }
        return e_car_buy_type.locked
    }

    public  count_bought(lv:number):void
    {
        this.buyCarsNum[lv-1]++
    }

    public  bought_state(type:number,lv:number):e_car_bought_state
    {
        let currentBuyLevel = this.get_gain_level() + 1
        if (type == 2)
        {
            currentBuyLevel = this.get_discount_level()
        }
        if (currentBuyLevel == lv)
        {
            return e_car_bought_state.can_buy
        }
        else if (currentBuyLevel < lv)
        {
            return e_car_bought_state.locked
        }
        else if (currentBuyLevel > lv)
        {
            return e_car_bought_state.bought
        }
        return e_car_bought_state.locked
    }

    public buy_car(cfg,buytype:e_car_buy_type)
    {
        if (buytype == e_car_buy_type.money)
        {
            let cost = this.get_price(cfg.level)
            let money = data_mgr.getInstance().get_money()
            if (money < cost)
            {
            
            }
            else
            {
                merge_mgr.getInstance().buy_car_by_gold(cfg,cost)
            }
        }
        else if(buytype == e_car_buy_type.diamond)
        {
            let cost = cfg.diamond
            let money = data_mgr.getInstance().get_diamond()
            if (money < cost)
            {

            }
            else
            {
                merge_mgr.getInstance().buy_car_by_diamond(cfg,cost)
            }
        }
    }

    public get_most_effective_car()
    {
        const lv = merge_mgr.getInstance().find_car_max_level()
        const cfg = cfg_mgr.getInstance().get_car(lv)
        const lock_id = cfg.unlock_buy_gold_level
        const num = Math.max(lock_id-4,1)
        let result = num
        let d = 999999
        for (let id=num;id<=lock_id;++id)
        {
            const price = this.get_price(id)
            const car_earnings = cfg.output_gold
            const rate = price/car_earnings
            if (rate < d){
                d = rate 
                result = id
            }
        }
        return result
    }
}

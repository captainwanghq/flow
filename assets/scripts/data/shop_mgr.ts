
import { cfg_mgr } from './cfg_mgr';
import { _decorator} from 'cc';
import base_mgr from '../base/base_mgr';
import { merge_mgr } from './merge_mgr';
import { data_mgr } from './data_mgr';
const { ccclass} = _decorator;

enum eCarBoughtState
{
    CanBuy = 0,
    Locked = 1,
    Bought = 2
}

enum eCarBuyType
{
    Money = 0,
    Diamond = 1,
    Locked = 2
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
    private getDiscountLevel():number
    {
        return 	this.boughDiscount
    }

    private getGainLevel():number
    {
        return this.boughtGain
    }
    public getPrice(lv:number)
    {
        const cfg = cfg_mgr.getInstance().getCar(lv)
        const  value= Math.pow(cfg.add_gold,this.buyCarsNum[lv-1])
        const discount = 1- this.getDiscount()/100
        return cfg.buy_gold*value*discount
    }
    public getDiscount():number
    {
        let lev = this.getDiscountLevel()
        let shopCfg = cfg_mgr.getInstance().getShopCfg()
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

    public getGainBuffer():number{
        const lev = this.getGainLevel()
        const cfg = cfg_mgr.getInstance().getCar(lev)
        if (cfg!=null)
        {
            return cfg.value
        }
        return 0
    }

    public isShopUnlock(carid:number):eCarBuyType 
    {
        const lv = merge_mgr.getInstance().find_car_max_level()
        const cfg = cfg_mgr.getInstance().getCar(lv)
        if (carid <= cfg.unlock_buy_gold_level)
        {
            return eCarBuyType.Money
        }
        if (carid <= cfg.unlock_buy_diamond_level)
        {
            return eCarBuyType.Diamond
        }
        return eCarBuyType.Locked
    }

    public  countBought(lv:number):void
    {
        this.buyCarsNum[lv-1]++
    }

    public  boughtState(type:number,lv:number):eCarBoughtState
    {
        let currentBuyLevel = this.getGainLevel() + 1
        if (type == 2)
        {
            currentBuyLevel = this.getDiscountLevel()
        }
        if (currentBuyLevel == lv)
        {
            return eCarBoughtState.CanBuy
        }
        else if (currentBuyLevel < lv)
        {
            return eCarBoughtState.Locked
        }
        else if (currentBuyLevel > lv)
        {
            return eCarBoughtState.Bought
        }
        return eCarBoughtState.Locked
    }

    public buyCar(cfg,buytype:eCarBuyType)
    {
        if (buytype == eCarBuyType.Money)
        {
            let cost = this.getPrice(cfg.level)
            let money = data_mgr.getInstance().getMoney()
            if (money < cost)
            {
            
            }
            else
            {
                merge_mgr.getInstance().buy_car_by_gold(cfg,cost)
            }
        }
        else if(buytype == eCarBuyType.Diamond)
        {
            let cost = cfg.diamond
            let money = data_mgr.getInstance().getDiamond()
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
        const cfg = cfg_mgr.getInstance().getCar(lv)
        const lock_id = cfg.unlock_buy_gold_level
        const num = Math.max(lock_id-4,1)
        let result = num
        let d = 999999
        for (let id=num;id<=lock_id;++id)
        {
            const price = this.getPrice(id)
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

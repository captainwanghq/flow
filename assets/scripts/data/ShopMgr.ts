import { _decorator, Component, Node } from 'cc';
import { CfgMgr } from './CfgMgr';
import { DataMgr } from './DataMgr';
const { ccclass, property } = _decorator;

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
@ccclass('ShopMgr')
export class ShopMgr extends g.BaseMgr {
    
    private  boughDiscount:number = 0;
    
    start () {
    
    }
    private getDiscountLevel():number
    {
        return 	this.boughDiscount
    }

    public getPrice(lv:number)
    {
        const carCfg = CfgMgr.getInstance().getCar(lv)
        return carCfg.buy_gold
    }
    public getDiscount():number
    {
        let lev = this.getDiscountLevel()
        let shopCfg = CfgMgr.getInstance().getShopCfg()
        shopCfg.forEach(el => {
            if (el.type == 2 && el.level == lev)
            {
                return el
            }
        });
        return null
    }
}
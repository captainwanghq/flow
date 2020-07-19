import { _decorator } from 'cc';
import DataSource from "./DataSource";
import BaseMgr from '../base/BaseMgr';
const { ccclass} = _decorator;

@ccclass('CfgMgr')
export class CfgMgr extends BaseMgr {
    _data = DataSource;
    public getCar(lv)
    {
       for (let k in this._data.car)
       {
           let it = this._data.car[k]
           if (it.level === lv)
           {
               return it
           }
       }
    }
    public getCarlist()
    {
        return this._data.car
    }

    public getShopCfg()
    {
        return this._data.shop
    }
}

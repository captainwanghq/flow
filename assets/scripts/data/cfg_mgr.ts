import { _decorator } from 'cc';
import data_source from "./data_source";
import base_mgr from '../base/base_mgr';
const { ccclass} = _decorator;

@ccclass('cfg_mgr')
export class cfg_mgr extends base_mgr {
    _data = data_source;
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

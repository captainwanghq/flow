import { _decorator } from 'cc';
import data_source from "./data_source";
import base_mgr from '../base/base_mgr';
import util from '../base/util';
const { ccclass} = _decorator;

@ccclass('cfg_mgr')
export class cfg_mgr extends base_mgr {
    _data = data_source;

    public start()
    {
    }
    public get_car(lv)
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
    public get_car_cfg()
    {
        return util.to_array(this._data.car)
    }

    public get_shop_cfg()
    {
        return util.to_array(this._data.shop)
    }

    public get_user_level_cfg()
    {
        return  util.to_array(this._data.userlevel)
    }
}

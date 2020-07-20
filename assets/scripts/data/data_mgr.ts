import { _decorator } from 'cc';
import base_mgr from '../base/base_mgr';
import event_mgr from '../base/event/event_mgr';
const { ccclass} = _decorator;
@ccclass('data_mgr')
export class data_mgr extends base_mgr {

    private _money:number = 10000;
    private _daimond:number = 0;
    public add_money(money:number):void
    {
        this._money += money
        event_mgr.getInstance().emit("","updatemoney")
    }

    public get_money():number{
        return this._money
    }

    public get_max_car_level():number
    {
        return 50
    }

    public get_diamond():number{
        return this._daimond
    }

    public add_diamond(num:number)
    {
        this._daimond += num
    }
}

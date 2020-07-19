import { _decorator } from 'cc';
import BaseMgr from '../base/BaseMgr';
import EventMgr from '../base/event/EventMgr';
const { ccclass} = _decorator;
@ccclass('DataMgr')
export class DataMgr extends BaseMgr {

    private _money:number = 10000;
    private _daimond:number = 0;
    public addMoney(money:number):void
    {
        this._money += money
        EventMgr.getInstance().emit("","updatemoney")
    }

    public getMoney():number{
        return this._money
    }

    public getMaxCarLevel():number
    {
        return 50
    }

    public getDiamond():number{
        return this._daimond
    }

    public addDiamond(num:number)
    {
        this._daimond += num
    }
}

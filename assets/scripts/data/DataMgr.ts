import { _decorator} from 'cc';
const { ccclass, property } = _decorator;
@ccclass('DataMgr')
export class DataMgr extends g.BaseMgr {

    private _money:number = 10000;
    public addMoney(money:number):void
    {
        this._money = money
    }

    public getMoney():number{
        return this._money
    }

    public getMaxCarLevel():number
    {
        return 10
    }
}

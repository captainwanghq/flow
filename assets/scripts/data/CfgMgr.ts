import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CfgMgr')
export class CfgMgr extends Component {
    _data = window.cfg
    static instance:CfgMgr=null
    onLoad () {
        if (CfgMgr.instance==null)
        {
            CfgMgr.instance = this
        }
    }
    public static getInstance()
    {
        return CfgMgr.instance
    }

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
}

import { _decorator } from 'cc';
import base_mgr from '../base/base_mgr';
import event_mgr from '../base/event/event_mgr';
import { merge_mgr } from './merge_mgr';
import { cfg_mgr } from './cfg_mgr';
import {pop_mgr} from '../base/pop_mgr';
const { ccclass} = _decorator;
@ccclass('data_mgr')
export class data_mgr extends base_mgr {

    private _money:number = 10000;
    private _daimond:number = 0;

    private user_level:number = 1

    private game_level:number = 1

    private user_exp = 0;

    public add_money(money:number):void
    {
        this._money += money
        event_mgr.getInstance().emit("","updatemoney")
    }

    public get_money():number{
        return this._money
    }

    public get_user_level()
    {
        return this.user_level
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

    public add_lev_exp(exp:number)
    {
        this.user_exp = this.user_exp + exp 
        return this.user_exp
    }

    public exp_2_level()
    {
        let exp = this.user_exp
        let all_exp = 0
        let lev = this.user_level
        let new_lev =  lev
        let max_plane  = 4

        let user_level_cfg = cfg_mgr.instance.get_user_level_cfg()
 
        for (let id=0;id<user_level_cfg.length;++id)
        {
            let item = user_level_cfg[id]
            all_exp += item.level_up_exp
            if (exp < all_exp)
            {
                new_lev = item.user_level
                max_plane = item.max_plane
                break
            }
        }
        if (new_lev > lev)
        {
            this.user_level = new_lev
            // 
            merge_mgr.instance.add_site(max_plane)
            event_mgr.instance.emit("","add_site")
            pop_mgr.instance.show('pbs/panels/shop/panel_site',1)
        }
        return new_lev
    }

    public get_level_slider()
    {
        let exp =  this.user_exp
        let all_exp = 0
        let cur_exp = 0
        let slider = 0

        let user_level_cfg = cfg_mgr.instance.get_user_level_cfg()
        for (let id=0;id<user_level_cfg.length;++id)
        {
            let item = user_level_cfg[id]
            all_exp += item.level_up_exp
            if(exp < all_exp)
            {
                cur_exp = all_exp - exp
                slider = cur_exp/item.level_up_exp
                break
            }
        }
        return slider
    }
}

import base_mgr from "../base/base_mgr";
import { Vec3 } from "cc";
import { cfg_mgr } from "./cfg_mgr";
import { shop_mgr } from "./shop_mgr";
import { data_mgr } from "./data_mgr";
import event_mgr from "../base/event/event_mgr";
import data from "./data_source";
class car_data
{
    public level:number
    public site:number
    public filled:number
    constructor(level,site,filled){
        this.level = level
        this.site = site
        this.filled = filled
    }
}

class site_shape{

    static get_all_site_pos(car_site_num)
    {
        if(car_site_num ==4)
        {	
            return [
                new Vec3(270,500)
                ,new Vec3(450,500)
                ,new Vec3(270,350)
                ,new Vec3(450,350)]
        }
        else if(car_site_num ==5)
        {	
            return [
                new Vec3(270,500)
                ,new Vec3(450,500)
                ,new Vec3(270,350)
                ,new Vec3(450,350)
                ,new Vec3(360,200)]
    
        }
        else if(car_site_num == 6)
        {
            return [
                new Vec3(270,500)
                ,new Vec3(450,500)
                ,new Vec3(270,350)
                ,new Vec3(450,350)
                ,new Vec3(270,200)
                ,new Vec3(450,200)]
        }
        else if(car_site_num == 7)
        {
            return [	
                new Vec3(180,500)
                ,new Vec3(360,500)
                ,new Vec3(540,500)
                ,new Vec3(180,350)
                ,new Vec3(360,350)
                ,new Vec3(540,350)
                ,new Vec3(360,200)]
        }
        else if(car_site_num == 8)
        {
            return [
                new Vec3(180,500)
               ,new Vec3(360,500)
               ,new Vec3(540,500)
               ,new Vec3(180,350)
               ,new Vec3(360,350)
               ,new Vec3(540,350)
               ,new Vec3(270,200)
               ,new Vec3(450,200)
        ]
        }
        else if(car_site_num == 9)
        {
            return [
                new Vec3(180,500)
              ,new Vec3(360,500)
              ,new Vec3(540,500)
              ,new Vec3(180,350)
              ,new Vec3(360,350)
              ,new Vec3(540,350)
              ,new Vec3(180,200)
              ,new Vec3(360,200)
              ,new Vec3(540,200)
      ]
        }
        else if(car_site_num == 10)
        {
            return [
                new Vec3(90,500)
                ,new Vec3(270,500)
                ,new Vec3(450,500)
                ,new Vec3(630,500)
                ,new Vec3(90,350)
                ,new Vec3(270,350)
                ,new Vec3(450,350)
                ,new Vec3(630,350)
                ,new Vec3(270,200)
                ,new Vec3(450,200)]
                
        }
        else if(car_site_num == 11)
        {
            return [
                new Vec3(90,500)
                ,new Vec3(270,500)
                ,new Vec3(450,500)
                ,new Vec3(630,500)
                ,new Vec3(90,350)
                ,new Vec3(270,350)
                ,new Vec3(450,350)
                ,new Vec3(630,350)
                ,new Vec3(180,200)
                ,new Vec3(360,200)
                ,new Vec3(540,200)]
        }
        else if(car_site_num == 12)
        {
            return [
                new Vec3(90,500)
                ,new Vec3(270,500)
                ,new Vec3(450,500)
                ,new Vec3(630,500)
                ,new Vec3(90,350)
                ,new Vec3(270,350)
                ,new Vec3(450,350)
                ,new Vec3(630,350)
                ,new Vec3(90,200)
                ,new Vec3(270,200)
                ,new Vec3(450,200)
                ,new Vec3(630,200)]
        }
        return [
            new Vec3(90,500)
            ,new Vec3(270,500)
            ,new Vec3(450,500)
            ,new Vec3(630,500)
            ,new Vec3(90,350)
            ,new Vec3(270,350)
            ,new Vec3(450,350)
            ,new Vec3(630,350)
            ,new Vec3(90,200)
            ,new Vec3(270,200)
            ,new Vec3(450,200)
            ,new Vec3(630,200)]
    }
}
export class merge_mgr extends base_mgr
{
    private car_max_level:number = 50
    private real_car_site_num:number = 4
    private car_data_list:car_data[] =[]
    start()
    {
        for (let idx=0;idx<this.real_car_site_num;++idx)
        {
            this.car_data_list.push(new car_data(1,idx,1))
        }
    }

    public add_site(max_site:number=12)
    {
        if(this.real_car_site_num < max_site)
        {
            this.real_car_site_num++
            this.car_data_list.push(new car_data(0,this.car_data_list.length,1) )
        }
    }

    public get_site_num():number{
        return this.real_car_site_num
    }

    public get_car_data_list()
    {
        return this.car_data_list
    }

    public find_card_data_by_site(site:number):car_data
    {
        for (let idx=0;idx<this.car_data_list.length;++idx)
        {
            if(site==this.car_data_list[idx].site)
            {
                return this.car_data_list[idx]
            }
        }
        return null
    }
    
    public get_all_pos()
    {   
       let car_site_num = this.real_car_site_num
       let all_pos =  site_shape.get_all_site_pos(car_site_num)
       return all_pos
    }

    public get_pos_by_site(site:number):Vec3
    {
        let all_pos = this.get_all_pos()
        if (site >=0 && this.real_car_site_num > site)
        {
            let pos = all_pos[site]
            let new_pos = new Vec3(pos.x-360,pos.y-640,pos.z)
            return new_pos
        }
        return Vec3.ZERO
    }
    //查找空位
    public find_blank_site()
    {
        for (let idx = 0;idx<this.car_data_list.length; ++idx){
            if( 0== this.car_data_list[idx].level){
                return idx
            }
        }
        return -1
    }

    public is_trash(v:Vec3):boolean
    {
        return false
    }

    public trash(site:number)
    {
        let data  = this.find_card_data_by_site(site)
        if(data!=null)
        {
            data.level = 0
        }
    }
    public buy_car_by_gold(cfg,cost)
    {
        let new_site = this.find_blank_site()
        if(new_site>=0)
        {   
            let data = this.find_card_data_by_site(new_site)
            data.level = cfg.level
            data_mgr.getInstance().add_money(-cost)
            shop_mgr.getInstance().countBought(cfg.level)

            event_mgr.getInstance().emit("","buy_car",{site:new_site,level:cfg.level})
        }
        else{
            console.log("site full")
        }
    }
    public buy_car_by_diamond()
    {

    }

    public is_valid_site(site:number):boolean
    {
        return site<0 || site >= this.real_car_site_num
    }

    private find_car_max_level():number
    {
        let lev = 1
        this.car_data_list.forEach(el => {
            if(el.level > lev){
                lev = el.level
            }
        })
        return lev
    }
    private check_car_max_level(lev:number)
    {
        const max_level = this.find_car_max_level()
        return lev == max_level
    }

    private add_lev_exp(lev:number)
    {
        let cfg = cfg_mgr.instance.get_car(lev)
        if (cfg!=null)
        {
            data_mgr.instance.add_lev_exp(cfg.merge_exp)
            //
            event_mgr.instance.emit("","update_user_level")
        }
    }

    public  merge(site1:number,site2:number):number
    {
        if(this.is_valid_site(site1)) return 0;
        if(this.is_valid_site(site2)) return 0;
        if(site1 == site2)
        {
            return 0
        }
        let data1 = this.find_card_data_by_site(site1)
        let data2 = this.find_card_data_by_site(site2)
        if (data1!=null && data2!=null)
        {
           if (data1.level == data2.level && data1.level>0 && data1.level < this.car_max_level)
           {
               this.add_lev_exp(data1.level)
               let ret = this.check_car_max_level(data2.level)
               data2.level++
               data1.level=0
               if(ret)
               {
                //unlock new car
               }
               return 1
           }
           else
           {
               let level = data1.level
               data1.level = data2.level
               data2.level = level
               if(data2.level>0 &&data1.level<=0){
                   return 3
               }
               return 2
           }
        }
        return 0
    }

    public get_income_per_second():number
    {
        let all_income = 0
        this.car_data_list.forEach(el=>{
            if(el.level>0){
                const cfg =  cfg_mgr.getInstance().get_car(el.level)
                let d = 1000/cfg.gold_interval
                let income = cfg.output_gold*d
                all_income +=income
            }
        })
        return all_income
    }

    public recommend()
    {
        let lv = shop_mgr.getInstance().get_most_effective_car()
        const cfg = cfg_mgr.getInstance().get_car(lv)
        return cfg
    }
}
import { _decorator, Component, ButtonComponent, Prefab, Vec2, UITransformComponent, tween, game, UIOpacityComponent, Vec3, sampleAnimationCurve, instantiate, NodePool, view } from 'cc';
import { merge_mgr } from '../data/merge_mgr';
import event_mgr from '../base/event/event_mgr';
import { man_unit } from './man_unit';
import { cfg_mgr } from '../data/cfg_mgr';
const { ccclass, property } = _decorator;

@ccclass('merge_view')
export class merge_view extends Component {
    @property(Prefab)
    pb_man:Prefab = null;

    @property(Prefab)
    pb_site:Prefab =  null;
    selected_id = -1;
    dragging_man = null;
    is_dragging = false;
    car_list:any=[]
    site_list:any=[]

    car_pool:NodePool = new NodePool()
    start () {
        game.config.showFPS = true
        this.node.setContentSize(cc.view.getVisibleSize());
        
        let car_list = merge_mgr.getInstance().get_car_data_list()
        
        for(let idx=0;idx<merge_mgr.instance.get_site_num();++idx)
        {
            let site_node = this.build_site(idx)
            this.site_list.push(site_node)
        }

        for (let idx=0;idx<car_list.length;++idx)
        {
             let data = car_list[idx]
             if(data.level > 0)
             {
                 let car = this.add_car(idx,data)
                 this.car_list.push(car)
             }
        }
        
        this.node.on(cc.Node.EventType.TOUCH_START,function(event)
        {
            let site = this.check_site(event.touch.getLocation())
            if(site>-1)
            {
               if(this.is_dragging) return 
                this.selected_id = site;
                this.is_dragging = true
                this.snapshot(site)
            }
        },this)

        this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(event)
        {
            if(this.is_dragging)
            {
                this.is_dragging = false
                this.check_end(event)
            }
        },this)


        this.node.on(cc.Node.EventType.TOUCH_END,function(event)
        {
            if(this.is_dragging)
            {
                this.is_dragging = false
                this.check_end(event)
            }

        },this)

        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(event)
        {   
            if(this.is_dragging)
            {
                if(this.dragging_man!=null)
                {
                    this.move(this.dragging_man,new Vec3(event.getDelta().x,event.getDelta().y,0))
                }
            }
        },this)


        event_mgr.instance.on("","buy_car",this.buy_car,this)
        event_mgr.instance.on("","add_site",this.add_site,this)
    }
    buy_car(data)
    {
        let car = this.add_car(data.site,data)
        this.car_list.push(car)
    }
    check_site(pos:Vec3)
    {
        let all_site = merge_mgr.instance.get_all_pos()
        for(let i =0;i<all_site.length;++i)
        {
            let car_pos = merge_mgr.instance.get_pos_by_site(i)
            let world_pos = this.getComponent(UITransformComponent).convertToWorldSpaceAR(car_pos);
            world_pos = world_pos.multiplyScalar(view.getScaleX())
            if(world_pos.x-90<pos.x && world_pos.x+90>pos.x && world_pos.y-90<pos.y && world_pos.y+90>pos.y )
            {
                return i;
            }
        }
        return -1;
    }
    
    private add_site(site)
    {
        for (let id=0;id<this.car_list.length;++id)
        {
            let car = this.car_list[id]
            if(car!=null)
            {
                let  car_site = car.getComponent(man_unit).get_data().site
                let pos =  merge_mgr.instance.get_pos_by_site(car_site)
                car.position = pos
            }
        }

        let node = this.build_site(this.site_list)
        this.site_list.push(node)
        for (let id=0;id<this.site_list.length;++id)
        {
            let site_node = this.site_list[id]
            if(site_node!=null)
            {
                let pos = merge_mgr.instance.get_pos_by_site(id)
                site_node.position = pos
            }
        }
    }

    private build_site(idx:number)
    {
       let site_node =  instantiate(this.pb_site)
       let pos = merge_mgr.instance.get_pos_by_site(idx)
       site_node.position = pos
       site_node.parent = this.node
       return site_node
    }
    /**
     * 
     * @param idx 
     * @param data 
     */
    private add_car(idx,data)
    {
        return this.create_man(idx,data.level)
    }

    private get_car_by_site(site)
    {
        for (let id=0;id<this.car_list.length;++id)
        {
            let el = this.car_list[id]
            if (el.getComponent(man_unit).get_data().site == site)
            {
                return el
            }
        }
        return null
    }

    private get_car_idx(site)
    {
        for (let id=0;id<this.car_list.length;++id)
        {
            let el = this.car_list[id]
            if (el.getComponent(man_unit).get_data().site == site)
            {
                return id
            }
        }
        return -1
    }
    private snapshot(site)
    {
        if (site >= 0)
        {
            let car = this.get_car_by_site(site)
            if(car)
            {
                let data = merge_mgr.getInstance().find_card_data_by_site(site)
                let lv = data.level
                this.dragging_man = this.clone_man(car,site,lv)     
            }
        }
    }
    private destroy_snapshot()
    {
        if (this.dragging_man!=null)
        {
            this.recycle(this.dragging_man)
            this.dragging_man = null
        }
        this.selected_id = -1
        this.is_dragging = false
    }
    
    private remove_car_by_site(src_site)
    {
        let idx = this.get_car_idx(src_site)
        if (idx >= 0)
        {
            this.car_list.splice(idx,1)
        }   
    }
    private merge_car(src_site:number,des_site:number,cb:Function)
    {
 
        const des_pos = merge_mgr.instance.get_pos_by_site(des_site)
        let lev  = this.dragging_man.getComponent(man_unit).get_data().level
        let site = this.dragging_man.getComponent(man_unit).get_data().site
        let newMan = this.clone_man(this.dragging_man,des_site,lev);
        let src_car = this.get_car_by_site(src_site)
        if(src_car)
        {
            this.remove_car_by_site(src_site)
            //src_car.parent = null
            this.recycle(src_car)
        }
        this.move(newMan,new Vec3(100,0,0))
        this.move(this.dragging_man,new Vec3(-100,0,0))
        tween(this.dragging_man).to(0.1,{position:des_pos}).start()
        tween(newMan).to(0.1,{position:des_pos}).call(()=>{
            const desData =  merge_mgr.instance.find_card_data_by_site(des_site)
            let car  = this.get_car_by_site(des_site)
            car.getComponent(man_unit).update_item({site:des_site,level:desData.level})
            //newMan.parent = null;
            this.recycle(newMan)
            if(cb)
            {
                cb()
            }
        }).start()
    }

    private update_site(site)
    {
        let car = this.get_car_by_site(site)
        if(car)
        {
            let data = merge_mgr.instance.find_card_data_by_site(site)
            car.getComponent(man_unit).update_item({site:data.site,level:data.level})
        }
    }
    private exchange_car(site1,site2)
    {
       this.update_site(site1)
       this.update_site(site2)
    }
    private drop_selected(site_id)
    {
        let car = this.get_car_by_site(site_id)
        if(car)
        {
            //let pos = merge_mgr.instance.get_pos_by_site(site_id)
           // car.position = pos
            car.getComponent(UIOpacityComponent).opacity = 255
        }
    }
    private move(targert,pos)
    {

        let scale_pos = pos.multiplyScalar(1/view.getScaleX())
        let originPos = targert.position
        let nPos = new Vec3(originPos.x+scale_pos.x,originPos.y+scale_pos.y,originPos.z)
        targert.position = nPos
    }
    private move_car(site1,site2)
    {
        let car = this.get_car_by_site(site1)
        if(car)
        {
          
            let pos = merge_mgr.instance.get_pos_by_site(site2)
            let data = merge_mgr.instance.find_card_data_by_site(site2)
            car.getComponent(man_unit).update_item({level:data.level,site:site2})
            car.position = pos
        }
    }

    private check_end(event)
    {
        let site_id = this.check_site(event.touch.getLocation())
        
        const ret = merge_mgr.instance.merge(this.selected_id,site_id)

        this.drop_selected(this.selected_id)

        if(ret == 1)
        {
            this.merge_car(this.selected_id,site_id,()=>{
                this.destroy_snapshot()
            })
        }
        else if(ret == 2)
        {
            this.exchange_car(this.selected_id,site_id)
            this.destroy_snapshot()
        }
        else if(ret == 3)
        {
            //blank site
            this.move_car(this.selected_id,site_id)
            this.destroy_snapshot()
        }
        else if(ret == 0)
        {
            this.destroy_snapshot()
        }
    }
    private clone_man(man,siteId,lv){
        let manSnapshot = this.get_car()
        manSnapshot.parent = this.node
        let pos = merge_mgr.instance.get_pos_by_site(siteId)
        manSnapshot.position = pos
        man.getComponent(UIOpacityComponent).opacity = 128
        manSnapshot.getComponent(man_unit).update_item({site:siteId,level:lv})
        return manSnapshot;
    }
    // update (dt) {}
    private create_man(site_id,lv)
    {
        let pos = merge_mgr.instance.get_pos_by_site(site_id);
        let man= this.get_car()
        man.parent = this.node
        man.position = pos;
        man.getComponent(man_unit).update_item({site:site_id,level:lv})
        return man
    }

    private get_car()
    {
        let car =  this.car_pool.get(this.pb_man)
        if(car == null)
        {
            car  = cc.instantiate(this.pb_man) 
        }
        return car
    }
    private recycle(car)
    {
        car.getComponent(UIOpacityComponent).opacity = 255;
        this.car_pool.put(car)
    }
}

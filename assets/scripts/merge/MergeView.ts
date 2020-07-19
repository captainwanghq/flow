import { _decorator, Component, ButtonComponent, Prefab, Vec2, UITransformComponent, tween, game, UIOpacityComponent, Vec3, sampleAnimationCurve } from 'cc';
import { merge_mgr } from '../data/MergeMgr';
import EventMgr from '../base/event/EventMgr';
import data from '../data/DataSource';
const { ccclass, property } = _decorator;

@ccclass('MergeView')
export class MergeView extends Component {
    @property(ButtonComponent)
    btnAdd:ButtonComponent = null;
    @property(Prefab)
    pbMan:Prefab =null;
    selected_id = -1;
    draggingMan = null;
    isDragging = false;
    manList=[];
    car_list:any=[]
    site_list:any=[]

    private build_site(site):Node
    {
        return null
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
            if (el.getComponent("ManUnit").get_data().site == site)
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
            if (el.getComponent("ManUnit").get_data().site == site)
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
                this.draggingMan = this.clone_man(car,site,lv)     
            }
        }
    }
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
               if(this.isDragging) return 
                this.selected_id = site;
                this.isDragging = true
                this.snapshot(site)
            }
        },this)

        this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(event)
        {
            if(this.isDragging)
            {
                this.isDragging = false
                this.check_end(event)
            }
        },this)


        this.node.on(cc.Node.EventType.TOUCH_END,function(event)
        {
            if(this.isDragging)
            {
                this.isDragging = false
                this.check_end(event)
            }

        },this)

        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(event)
        {   
            if(this.isDragging)
            {
                if(this.draggingMan!=null)
                {
                    this.move(this.draggingMan,new Vec3(event.getDelta().x,event.getDelta().y,0))
                }
            }
        },this)


        EventMgr.getInstance().on("","buy_car",this.buy_car,this)
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
            if(world_pos.x-90<pos.x && world_pos.x+90>pos.x && world_pos.y-90<pos.y && world_pos.y+90>pos.y )
            {
                return i;
            }
        }
        return -1;
    }
    
    private destroy_snapshot()
    {
        this.draggingMan.parent = null
        this.draggingMan = null
        this.selected_id = -1
        this.isDragging = false
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
        let lev  = this.draggingMan.getComponent("ManUnit").get_data().level
        let site = this.draggingMan.getComponent("ManUnit").get_data().site
        let newMan = this.clone_man(this.draggingMan,site,lev);
        let src_car = this.get_car_by_site(src_site)
        if(src_car)
        {
            this.remove_car_by_site(src_site)
            src_car.parent = null
        }
        this.move(newMan,new Vec3(100,0,0))
        this.move(this.draggingMan,new Vec3(-100,0,0))
        tween(this.draggingMan).to(0.1,{position:des_pos}).start()
        tween(newMan).to(0.1,{position:des_pos}).call(()=>{
            const desData =  merge_mgr.instance.find_card_data_by_site(des_site)
            let car  = this.get_car_by_site(des_site)
            car.getComponent("ManUnit").updateItem({site:des_site,level:desData.level})
            newMan.parent = null;
            if(cb)
            {
                cb("pp")
            }
        }).start()
    }

    private update_site(site)
    {
        let car = this.get_car_by_site(site)
        if(car)
        {
            let data = merge_mgr.instance.find_card_data_by_site(site)
            car.getComponent("ManUnit").updateItem({site:data.site,level:data.level})
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
        let originPos = targert.position
        let nPos = new Vec3(originPos.x+pos.x,originPos.y+pos.y,originPos.z+pos.z)
        targert.position = nPos
    }
    private move_car(site1,site2)
    {
        let car = this.get_car_by_site(site1)
        if(car)
        {
          
            let pos = merge_mgr.instance.get_pos_by_site(site2)
            let data = merge_mgr.instance.find_card_data_by_site(site2)
            car.getComponent("ManUnit").updateItem({level:data.level,site:site2})
            car.position = pos
        }
    }

    check_end(event)
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
    clone_man(man,siteId,lv){
        let manSnapshot = cc.instantiate(this.pbMan)
        manSnapshot.parent = this.node;
        manSnapshot.position = man.position;
        man.getComponent(UIOpacityComponent).opacity = 128;
        manSnapshot.getComponent('ManUnit').updateItem({site:siteId,level:lv})
        return manSnapshot;
    }
    // update (dt) {}
    create_man(site_id,lv)
    {
        let pos = merge_mgr.instance.get_pos_by_site(site_id);
        let man  = cc.instantiate(this.pbMan) 
        man.parent = this.node
        man.position = pos;
        man.getComponent("ManUnit").updateItem({site:site_id,level:lv})
        return man
    }
    public onClickAdd()
    {
        let manData  = merge_mgr.instance.addMan();
        if(manData)
        {
            let man = this.create_man(manData.site,manData.level);
            this.manList[manData.site] = man;
        }
    }

}

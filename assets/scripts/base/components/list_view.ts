import { Component, _decorator, ScrollViewComponent, Prefab, instantiate, Vec3, UITransformComponent } from "cc";
import { list_item } from "./list_item";

const { ccclass, property } = _decorator;

@ccclass('list_view')
export class list_view extends Component
{
    @property(ScrollViewComponent)
    sroll_view:ScrollViewComponent = null
    @property(Prefab)
    item_prefab:Prefab = null
    all_items_node:any = []
    buffer_height:number = 80
    data_source:any = []
    half_view_height:number = 450
    item_height:number = 150
    last_content_pos_y = 0
    span_count:number = 7
    update_timer = 0
    update_interval = 0.2
    view_height:number = 900
    start()
    {
        let test_list = [10,11,12,13]
        this.set_data(test_list)
        let span = Math.min(this.span_count,this.data_source.length)
        let start_y = 0.5*this.item_height 
        for (let id=0;id<span;++id){
          
            let item = instantiate(this.item_prefab)
            item.addComponent(list_item)
            item.parent = this.node
            item.position = new Vec3(0,-start_y,0)
            start_y += this.item_height 
            item.getComponent(list_item).set_data({idx:id,data:this.data_source[id]})
            this.all_items_node.push(item)
        }

        const total_height = this.item_height*this.data_source.length
        this.node.height = total_height
        this.view_height = this.sroll_view.node.getContentSize().height
        this.half_view_height = this.view_height*0.5
    }

    set_data(data)
    {
        this.data_source = data
    }

    get_position_in_view(item)
    {
        let world_pos  = this.getComponent(UITransformComponent).convertToWorldSpaceAR(item.position);
        let view_pos = this.sroll_view.node.getComponent(UITransformComponent).convertToNodeSpaceAR(world_pos)
        return view_pos
    }

    get_offset_y(old_idx,new_idx)
    {
        let offset = 0
        for (let idx=old_idx;idx<new_idx;++idx)
        {
            offset += this.item_height
        }
        return offset
    }
    check_items(offset)
    {
        let buffer = this.buffer_height
        let is_down = this.node.position.y < this.last_content_pos_y
        let items = this.all_items_node
        for (let idx=0;idx< items.length;++idx)
        {
            let item = items[idx]
            let view_pos = this.get_position_in_view(item)
            if (is_down)
            {
                if (view_pos.y < -buffer-this.half_view_height )
                {
                    let old_idx = item.getComponent(list_item).get_data().idx
                    let new_idx = old_idx - items.length
                    let new_info = this.data_source[new_idx]
                    if (new_info!=null)
                    {
                        let offset_y = this.get_offset_y(new_idx,old_idx)
                        let pos = item.position
                        let new_pos = new Vec3(pos.x,pos.y+offset_y,pos.z)
                        item.position = new_pos
                        item.getComponent(list_item).set_data({idx:new_idx,data:new_info})
                    }
                }
            }
            else
            {
                if(view_pos.y > buffer+ this.half_view_height )
                {
                    let old_idx = item.getComponent(list_item).get_data().idx
                    let new_idx = old_idx + items.length
                    let new_info = this.data_source[new_idx]
                    if (new_info!=null)
                    {
                        let offset_y = this.get_offset_y(old_idx,new_idx)
                        let pos = item.position
                        let new_pos = new Vec3(pos.x,-offset_y+pos.y,pos.z)
                        item.position = new_pos
                        item.getComponent(list_item).set_data({idx:new_idx,data:new_info})
                    }
                }
            }
        }

    }

    get_total_height()
    {
        const total_height = this.item_height*this.data_source.length
        return total_height
    }

    update(deltaTime: number)
    {
        this.update_timer +=deltaTime
        if  (this.update_timer < this.update_interval)
        {
            return
        }
        this.update_timer = 0
        let offset =  this.item_height*this.all_items_node.length
        this.check_items(offset)
        this.last_content_pos_y = this.node.position.y
    }
}
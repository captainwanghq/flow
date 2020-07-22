import { _decorator, Component, Node, loader, Prefab, instantiate, tween, Vec3 } from 'cc';
import base_mgr from './base_mgr';
import { scene_mgr } from './scene_mgr';
const { ccclass, property } = _decorator;

@ccclass('pop_mgr')
export class pop_mgr extends base_mgr {
    private pop_map:Map<string,Node> =new Map<string,Node>()
    public show(popname,action)
    {
        if (this.pop_map.has(popname))
        {
           let pb =  this.pop_map.get(popname)
           this._show(pb,action)
        }
        else{
            loader.loadRes(popname, Prefab ,(err: any, pb: Prefab) => { 
                const pop = instantiate(pb)
                this.add_to_scene(pop)
                this._show(pop,action)
                this.pop_map.set(popname,pop)
            }); 
        }
    }
    private _show(pop,action)
    {
  
        if(pop!=null)
        {
            pop.active = true
            if (action == 1)
            {
                pop.scale = new Vec3(0.5,0.5,0.5)
                tween(pop).to(0.1,{scale:new Vec3(1,1,1)}).start()
            }
        }
    }

    private _hide(pop)
    {

        if(pop!=null)
        {
            pop.active = false
        }
    }
    private add_to_scene(pop:Node)
    {
        scene_mgr.instance.add_pop(pop)
    }

    public hide()
    {
        this.pop_map.forEach(value => {
            if(value)
            {
                this._hide(value)
            }
        });
    }
}

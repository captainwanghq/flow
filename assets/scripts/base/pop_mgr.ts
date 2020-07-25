import { _decorator, Component, Node, loader, Prefab, instantiate, tween, Vec3, path } from 'cc';
import base_mgr from './base_mgr';
import { scene_mgr } from './scene_mgr';
const { ccclass, property } = _decorator;

@ccclass('pop_mgr')
export class pop_mgr extends base_mgr {
    private pop_map:Map<string,Node> =new Map<string,Node>()


    public _show_overlay(b:boolean,bindex=0)
    {
        let popname = 'pbs/panels/shop/pop_mask'
        if (this.pop_map.has(popname))
        {
           let pb =  this.pop_map.get(popname)
           pb.active = b
           if (b)
           {      
              //  pb.setSiblingIndex(bindex)
           }
        }
        else{
            loader.loadRes(popname, Prefab ,(err: any, pb: Prefab) => { 
                if (err ==null)
                {
                    const pop = instantiate(pb)
                    this.pop_map.set(popname,pop)
                    this._add_to_scene(pop,bindex)
                    pop.active = b
                }
            }); 
        }
    }

    private _show(pop,action,bindex)
    {
        if(pop!=null)
        {
            pop.active = true
            this._show_overlay(true,bindex)
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
            this._show_overlay(false)
            pop.active = false
        }
    }
    private _add_to_scene(pop:Node,bindex =0)
    {
        scene_mgr.instance.add_pop(pop,bindex)
    }

    public show(popname,action)
    {
        this.hide()
        if (this.pop_map.has(popname))
        {
           let pb =  this.pop_map.get(popname)
           let bindex = pb.getSiblingIndex()
           this._show(pb,action,bindex)
        }
        else{
            loader.loadRes(popname, Prefab ,(err: any, pb: Prefab) => { 
                if(err == null)
                {
                    const pop = instantiate(pb)
                    this.pop_map.set(popname,pop)
                    const bindex = this.pop_map.size
                    this._add_to_scene(pop,bindex)
                    this._show(pop,action,bindex-1)
                }
            }); 
        }
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

    //test
    public top_overlay()
    {
        const bindex = this.pop_map.size
        this._show_overlay(true,bindex)
    }

}

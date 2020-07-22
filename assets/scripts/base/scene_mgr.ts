import { _decorator, Node, director, Scene, game, CanvasComponent, view, GraphicsComponent, Color, UITransformComponent, TERRAIN_HEIGHT_BASE, Prefab, loader, instantiate } from 'cc';
import base_mgr from './base_mgr';
const { ccclass, property } = _decorator;

@ccclass('scene_mgr')
export class scene_mgr extends base_mgr {
    current_scene:Scene = null;
    root_node:Node=null;
    overlay_node:Node = null;
    constructor()
    {
        super();
        this.load_root_node()
    }
    private  load_scene_before()
    {

    }
    private toggle_persist_root_node(b:Boolean=true)
    {
        if(this.root_node)
        {
            if (game.isPersistRootNode(this.root_node))
            {
                game.removePersistRootNode(this.root_node)
            }
            if (b)
            {
                this.root_node.parent = null
                game.addPersistRootNode(this.root_node)
            }
            else{
                let scene =  director.getScene()
                let canvas = scene.getComponentInChildren(CanvasComponent)
                if (canvas)
                {
                    canvas.node.addChild(this.root_node)
                }
            }
        }
    }
    private on_launched()
    {
        this.toggle_persist_root_node(false)
        this.current_scene = director.getScene()
        console.log(this.current_scene)
    }
    private update_size()
    {

    }
    private load_root_node()
    {   
        this.current_scene = director.getScene()
        if(this.root_node==null)
        {
            let root_node = new Node("root_node")
            let canvas = this.current_scene.getComponentInChildren(CanvasComponent)
            canvas.node.addChild(root_node)
            root_node.setSiblingIndex(100)
            this.root_node = root_node
        }
        this.update_size()
    }
    public  load_scene(scenename)
    {
        this.load_scene_before()
        this.toggle_persist_root_node(true)
        director.loadScene(scenename,this.on_launched.bind(this))
    }

    public add_pop(panel:Node,zindex=0)
    {
        if (this.root_node!=null)
        {   
            console.log(zindex)
            this.root_node.insertChild(panel,zindex)
            // panel.parent = this.root_node
            panel.active = true
        }
    }

}

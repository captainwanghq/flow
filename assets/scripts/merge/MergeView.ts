import { _decorator, Component, ButtonComponent, Prefab, Vec2, UITransformComponent, tween, game, UIOpacityComponent, Vec3 } from 'cc';
import { MergeMgr } from '../data/MergeMgr';
const { ccclass, property } = _decorator;

@ccclass('MergeView')
export class MergeView extends Component {
    @property(ButtonComponent)
    btnAdd:ButtonComponent = null;
    @property(Prefab)
    pbMan:Prefab =null;
    selectedMan = null;
    selectedId = -1;
    draggingMan = null;
    isDragging = false;
    manList=[];
    start () {
        game.config.showFPS = true
        this.node.setContentSize(cc.view.getVisibleSize());
        let allMan = MergeMgr.getInstance().getAllMan();
        for(let i=0;i<allMan.length;++i)
        {  
            let lv = allMan[i];
            if(lv>0)
            {
                let man = this.createMan(i,lv)
                this.manList.push(man)
            }
            else{
                this.manList.push(null);
            }
        }

        this.node.on(cc.Node.EventType.TOUCH_START,function(event)
        {
            let site = this.checkSite(event.touch.getLocation())
            if(site>-1)
            {
               
                this.selectedId = site;
                let man = this.manList[site];
                this.selectedMan = man;
                if(man!=null)
                {
                    let lv = MergeMgr.getInstance().getManLevel(site)
                    this.draggingMan = this.cloneMan(man,site,lv);
                    this.isDragging = true;
                }    
            }
        },this)

        this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(event)
        {
            if(this.isDragging)
            {
                this.isDragging = false
                this.checkEnd(event)
            }
        },this)


        this.node.on(cc.Node.EventType.TOUCH_END,function(event)
        {
            if(this.isDragging)
            {
                this.isDragging = false
                this.checkEnd(event)
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
    }
    checkSite(pos:Vec2)
    {
        let allSites = MergeMgr.getInstance().getStaticSites();
        for(let i =0;i<allSites.length;++i)
        {
            let worldPos = this.getComponent(UITransformComponent).convertToWorldSpaceAR(allSites[i]);
            if(worldPos.x-90<pos.x && worldPos.x+90>pos.x && worldPos.y-90<pos.y && worldPos.y+90>pos.y )
            {
                return i;
            }
        }
        return -1;
    }
    
    checkEnd(event)
    {
        let siteId = this.checkSite(event.touch.getLocation())
        let allSites = MergeMgr.getInstance().getStaticSites();
        if(siteId >=0)
        {
            let distMan = this.manList[siteId];
            if(distMan!=null)
            {
                let selectedLv = MergeMgr.getInstance().getManLevel(this.selectedId);
                let ret =MergeMgr.getInstance().exchangeMan(this.selectedId,siteId)

                if(ret == 0)
                {   //起点和目的点是同一个座位
                    this.draggingMan.parent = null;
                    tween(this.draggingMan).to(0.2,{position:allSites[siteId]}).start()
                    this.selectedMan.getComponent(UIOpacityComponent).opacity = 255;
                    this.selectedId = -1;
                }
                else if(ret == 1)
                {
                    let newMan = this.cloneMan(this.draggingMan,this.selectedId,selectedLv);
                    this.move(newMan,new Vec3(100,0,0))
                    this.move(this.draggingMan,new Vec3(-100,0,0))
                    tween(this.draggingMan).to(0.1,{position:allSites[siteId]}).start()
                    tween(newMan).to(0.1,{position:allSites[siteId]}).call(()=>{
                        let lv = MergeMgr.getInstance().getManLevel(siteId);
                        this.manList[siteId].getComponent("ManUnit").updateItem({site:siteId,level:lv})
                        this.manList[this.selectedId] = null; 
                        newMan.parent = null;
                        this.draggingMan.parent = null;
                        this.selectedMan.parent = null;
                        this.selectedId = -1;
                    }).start()
                }
                else if(ret == 2)
                {
                    this.manList[siteId].getComponent("ManUnit").updateItem({site:siteId,level:MergeMgr.getInstance().getManLevel(siteId)})
                    this.manList[this.selectedId].getComponent("ManUnit").updateItem({site:this.selectedId,level:MergeMgr.getInstance().getManLevel(this.selectedId)})
                    this.selectedMan.getComponent(UIOpacityComponent).opacity = 255;
                    this.selectedMan = null;
                    this.selectedId = -1;
                    this.draggingMan.parent = null;
                    this.draggingMan = null;
                }
            }
            else{
                MergeMgr.getInstance().exchangeMan(this.selectedId,siteId)
                //目的点是空位
                tween(this.draggingMan).to(0.02,{position:allSites[siteId]}).call(()=>{      
                        this.draggingMan.parent = null;
                        this.manList[siteId] = this.selectedMan;
                        this.manList[this.selectedId] = null;
                        this.selectedMan.getComponent(UIOpacityComponent).opacity = 255;
                        this.selectedMan.position = allSites[siteId];
                        this.selectedMan = null;
                        this.selectedId = -1;}).start()
            }
        }
        else
        {
            tween(this.draggingMan).to(0.1,{position:allSites[this.selectedId]}).call(()=>{
                this.draggingMan.parent = null;          
                this.selectedMan.getComponent(UIOpacityComponent).opacity = 255;
                this.selectedId = -1;
            }).start()
        } 
    }
    cloneMan(man,siteId,lv){
        let manSnapshot = cc.instantiate(this.pbMan)
        manSnapshot.parent = this.node;
        manSnapshot.position = man.position;
        man.getComponent(UIOpacityComponent).opacity = 128;
        manSnapshot.getComponent('ManUnit').updateItem({site:siteId,level:lv})
        return manSnapshot;
    }
    // update (dt) {}
    createMan(siteId,lv)
    {
        let allSites = MergeMgr.getInstance().getStaticSites();
        let ps = allSites[siteId];
        let man  = cc.instantiate(this.pbMan) 
        man.parent = this.node
        man.position = ps;
        man.getComponent("ManUnit").updateItem({site:siteId,level:lv})
        return man
    }
    public onClickAdd()
    {
        let manData  = MergeMgr.getInstance().addMan();
        if(manData)
        {
            let man = this.createMan(manData.site,manData.level);
            this.manList[manData.site] = man;
        }
    }
    move(targert,pos)
    {
        let originPos = targert.position
        let nPos = new Vec3(originPos.x+pos.x,originPos.y+pos.y,originPos.z+pos.z)
        targert.position = nPos
    }

}

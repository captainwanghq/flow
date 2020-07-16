import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MergeMgr')
export class MergeMgr extends Component {
    
    siteleveList =  [0,1,2,3,0,1,2,3,3,2,1,0];

    public getStaticSites()
    {
        let size =  cc.size(720,1280); //cc.view.getVisibleSize()
        let w = size.width;
        let h = size.height;
        let allSites = []
        for(let i =0 ;i<3;i++)
        {
            for(let j=0;j<4;j++)
            {
                allSites.push(new Vec3(90+180*j-w/2,200+200*i-h/2,-1))
            }
        }
        return allSites
    }

    public getAllMan()
    {
        return this.siteleveList;
    }

    public getManLevel(site)
    {
        return this.siteleveList[site];
    }

    public setManLevel(site,lv)
    {
        this.siteleveList[site] = lv
    }

    public getBlankSite()
    {
        for(let i=0;i<this.siteleveList.length;++i)
        {
            if(this.siteleveList[i]<=0)
            {
                return i
            }
        }
        return -1;
    }

    public addMan(lv=5)
    {
        let blankSite = this.getBlankSite()

        if(blankSite >-1)
        {
            this.setManLevel(blankSite,lv)
            return {site:blankSite,level:lv}
        }
        return null
    }
    public exchangeMan(srcSite,distSite)
    {
        if(srcSite == distSite)
        {
            //同一个位置
            return 0
        }
        else{
            let srcLv =  this.getManLevel(srcSite);
            let distLv = this.getManLevel(distSite);
            if(srcLv == distLv)
            {
                this.setManLevel(distSite,distLv+1);
                this.setManLevel(srcSite,0);
                return 1;
            }
            else{
                this.setManLevel(srcSite,distLv);
                this.setManLevel(distSite,srcLv);
                return 2;
            }
        }
    }
}

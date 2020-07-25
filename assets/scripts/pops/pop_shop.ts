import { _decorator, Component, Node, ButtonComponent, ScrollViewComponent } from 'cc';
import { pop_mgr } from '../base/pop_mgr';
import { list_view } from '../base/components/list_view';
import { data_mgr } from '../data/data_mgr';
import { cfg_mgr } from '../data/cfg_mgr';
const { ccclass, property } = _decorator;

@ccclass('pop_shop')
export class pop_shop extends Component {

    @property(ButtonComponent)
    btn_che_ku_0:ButtonComponent=null
    @property(ButtonComponent)
    btn_che_ku_1:ButtonComponent=null
    @property(ButtonComponent)
    btn_te_quan_0:ButtonComponent=null
    @property(ButtonComponent)
    btn_te_quan_1:ButtonComponent=null

    @property(ScrollViewComponent)
    cheku_scroll:ScrollViewComponent =null

    @property(ScrollViewComponent)
    tequan_scroll:ScrollViewComponent =null

    @property(Node)
    cheku_content:Node =null

    @property(Node)
    tequan_content:Node =null
    start () {
        // Your initialization goes here.

        this.select_tab(1)
    }

    on_click_close()
    {
        pop_mgr.getInstance().hide()
    }
    
    select_tab(id)
    {
        if( id == 1)
        {
            this.btn_che_ku_0.node.active = true
            this.btn_che_ku_1.node.active = false
            this.btn_te_quan_0.node.active = true
            this.btn_te_quan_1.node.active = true

            this.tequan_scroll.node.active = false
            this.cheku_scroll.node.active = true

            let shop_list = cfg_mgr.instance.get_car_cfg()
            this.cheku_scroll.getComponentInChildren(list_view).set_data(shop_list)
        }
        else if (id == 2){
            this.btn_che_ku_0.node.active = true
            this.btn_che_ku_1.node.active = true
            this.btn_te_quan_0.node.active = true
            this.btn_te_quan_1.node.active = false
            this.tequan_scroll.node.active = true
            this.cheku_scroll.node.active = false
    
            let shop_discount_cfg = cfg_mgr.instance.get_shop_cfg()
            this.tequan_scroll.getComponentInChildren(list_view).set_data(shop_discount_cfg)
        }

    }

    on_select_che_ku()
    {
        this.select_tab(1)
  
    }

    on_select_te_quan()
    {
        this.select_tab(2)
       
    }
}

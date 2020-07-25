import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('pop_base')
export class pop_base extends Component {
    is_created = false
    onEnable()
    {
        if (this.is_created)
        {
           this.onShow()
        }
        else
        {
            this.is_created = true
        }
    }

    onShow()
    {

    }
}

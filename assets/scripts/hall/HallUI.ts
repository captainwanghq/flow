import { _decorator, Component, Node, LabelComponent } from 'cc';
import { DataMgr } from '../data/DataMgr';
const { ccclass, property } = _decorator;

@ccclass('HallUI')
export class HallUI extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(Node)
    moneyNode:Node = null
    start () {
        // Your initialization goes here.
        let money  = DataMgr.getInstance().getMoney()
        this.moneyNode.getComponent(LabelComponent).string= money.toString()
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}

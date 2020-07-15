import { _decorator, Component, Node } from 'cc';
import { CarMovement } from './CarMovement';
const { ccclass, property } = _decorator;

@ccclass('GameInput')
export class GameInput extends Component {

    @property(Node)
    carNode:Node = null;
    _car:CarMovement = null;
    start () {
        // Your initialization goes here.
        this._car = this.carNode.getComponent(CarMovement);
        this.node.on(cc.Node.EventType.TOUCH_START,this.onDown,this)
        this.node.on(cc.Node.EventType.TOUCH_END,this.onUp,this)
    }
    onDown()
    {
        console.log("onDown")
        if(this._car)
        {
            this._car.turnFwd(1)
        }
    }
    onUp()
    {
        console.log("onUp")
        if(this._car)
        {
            this._car.turnFwd(2)
        }
    }
}

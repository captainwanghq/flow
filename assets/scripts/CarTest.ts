import { _decorator, Component, Node, Vec3, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CarTest')
export class CarTest extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
        //this.node.setRotationFromEuler(0,10,0)
        
        this.node.translate(new Vec3(0,0,10),1)
        console.log(this.node.worldPosition)
        console.log(this.node.position)
        // tween(this.node).stop().to(0.175,{eulerAngles:new Vec3(0,-90,0)}).call(()=>{
        //     console.log(this.node.forward)
         
        // }).start()
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}

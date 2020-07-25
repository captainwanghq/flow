import { _decorator, Component, Node, Vec3, quat, tween, game, BoxColliderComponent, ITriggerEvent, View, director } from 'cc';
import { scene_mgr } from './base/scene_mgr';
const { ccclass, property } = _decorator;

enum CarState {
    Invalid = -1,
	Move,
	DriftLeft,
	DriftRight,
	Fly,
	Die,
	Finish
}


@ccclass('CarMovement')
export class CarMovement extends Component {
    private _deltaTime:number =1/45
    private _carState:number = -1
    start () {
        // Your initialization goes here.
       game.config.showFPS = true
       game.setFrameRate(58)
       this._deltaTime = 1/game.getFrameRate();
       let collider = this.node.getComponent(BoxColliderComponent)
       collider.on("onTriggerEnter",this._onTriggerEnter,this)
    }

    update (deltaTime: number) {
        // Your update function goes here.
        if (this._carState < CarState.Finish)
        {
            let moveDir = new Vec3(Vec3.FORWARD)
            let v = moveDir.multiplyScalar(-20*this._deltaTime);
            this.node.translate(v)
        }
        else if(this._carState ==  CarState.Finish )
        {
            tween(this.node).stop().to(0.15,{eulerAngles:new Vec3(0,90,0)}).start()
        }
        if (this.node.position.y <-5)
        {
            //tween(this.node).delay(1).call(()=>{
                scene_mgr.instance.load_scene("hall")
            //}).start()
        }
    }

    private _onTriggerEnter(event:ITriggerEvent)
    {
        console.log(event)
        if (event.otherCollider.node.name == "FinishPlane")
        {
            this._carState =  CarState.Finish

            tween(this.node).delay(1).call(()=>{
               scene_mgr.instance.load_scene("hall")
            }).start()
            
        }
    }
    public turnFwd(dir:number):void{
        
        if (this._carState <  CarState.Finish)
        {
            if (dir == 1)
            {   
            /* tween(this.node)
            *   .to(1, {scale: new Vec3(2, 2, 2), position: new Vec3(5, 5, 5)})
            *   .call(() => { console.log('This is a callback'); })
            *   .by(1, {scale: new Vec3(-1, -1, -1)}, {easing: 'sineOutIn'})
            *   .start()*/
                tween(this.node).stop().to(0.5,{eulerAngles:new Vec3(0,-90,0)}).start()
            }
            else if(dir == 2)
            {
                tween(this.node).stop().to(0.5,{eulerAngles:new Vec3(0,0,0)}).start()
            }
        }
    }
}

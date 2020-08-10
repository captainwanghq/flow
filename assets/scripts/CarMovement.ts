import { _decorator, Component, Node, Vec3, quat, tween, game, BoxColliderComponent, ITriggerEvent, View, director, ICollisionEvent } from 'cc';
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
    private isCanTurnFwd = true
    private m_bRoationing = false
    private m_curMoveSpeed = 0
    private m_curMoveDir = new Vec3(0,0,1)
    private  fMaxRotationX = 20
    private  fMaxRotationZ = 10
    private count = 0
    start () {
        // Your initialization goes here.
       game.config.showFPS = true
       game.setFrameRate(58)
       this._deltaTime = 1/game.getFrameRate();
        let collider = this.node.getComponent(BoxColliderComponent)
        collider.on("onTriggerEnter",this._onTriggerEnter,this)
    //   collider.on("onCollisionEnter",this._onCollisionEnter,this)
    //   collider.on("onCollisionExit",this._onCollisionEnter,this)
       this.StartPlay()
    }

    update (dt: number) {
        console.log(this.node.forward)
        const deltaTime = this._deltaTime
        switch (this._carState)
        {
            case CarState.Die:
                this.SimulateDieState(deltaTime)
                break;
            case CarState.DriftLeft:
                this.SimulateDriftState(Vec3.FORWARD,deltaTime)
                break;
            case CarState.DriftRight:
                this.SimulateDriftState(Vec3.RIGHT,deltaTime)
                break;
            case CarState.Finish:
                this.SimulateFinishState(deltaTime)
                break;
            case CarState.Fly:
                this.SimulateFlyState(deltaTime)
                break;
            case CarState.Move:
                this.SimulateMoveState(deltaTime)
                break;
        }
        this.UpdatePosition(deltaTime)
        //this.DoTurnFwd(deltaTime)
      //  this.CorrectRotation()
        //this.CheckDie(deltaTime)
    }

    private get isCanMove()
    {
        if (this._carState != CarState.Die)
        {
            return true
        }
        return false
    }
    UpdatePosition(deltaTime:number)
    {
        if (this.isCanMove)
        {
            const d = -this.m_curMoveSpeed* deltaTime
            const dir = this.m_curMoveDir.clone().normalize()
            let v = dir.multiplyScalar(d);
            this.node.translate(v,0)
            //this.node.translate(new Vec3(0,0,d),0)
        }
    }

    private isCanCorrectRotation()
    {
        if (CarState.Fly == this._carState || CarState.Move == this._carState)
        {
            return true
        }
        return false
    }
    CorrectRotationY()
    {
        const num = this.node.forward.dot(Vec3.FORWARD)
        const num2 = this.node.forward.dot(Vec3.RIGHT)
        const angle = this.node.eulerAngles
        if (num > num2)
        {
            const newAngle = new Vec3(angle.x,0,angle.z)
            this.node.eulerAngles = newAngle
        }
        else{
            const newAngle = new Vec3(angle.x,90,angle.z)
            this.node.eulerAngles = newAngle
        }
    }
    CorrectRotation()
    {
        if (this.isCanCorrectRotation())
        {
            let angle = this.node.eulerAngles.clone()
   
            if (angle.x > 180)
            {
                angle.x -= 360;
            }
            if (angle.y > 180)
            {
                angle.y -= 360;
            }
            if (angle.z > 180)
            {
                angle.z -= 360;
            }
    
            console.log(angle)
            let num = 0
            let num2 = 0

            if (angle.x > this.fMaxRotationX)
            {
                num = this.fMaxRotationX - angle.x
            }
            else if (angle.x < 0 - this.fMaxRotationX)
            {
                num = 0 - this.fMaxRotationX -angle.x
            }
            if (angle.z > this.fMaxRotationZ)
            {
                num2 = this.fMaxRotationZ - angle.z
            }
            else if (angle.z < -this.fMaxRotationZ)
            {
                num2 = 0-this.fMaxRotationZ - angle.z
            }
            if (num !=0 || num2 !=0)
            {
                // let q = quat(num,0,num2)
                // this.node.rotate(q)
                this.node.setRotationFromEuler(0,0,0)
               // this.node.eulerAngles = new Vec3(num2,0,num2)
            }
        }
    }
    StartPlay()
    {
        this.m_bRoationing = false
        this.m_curMoveDir = this.node.forward
        this.SetState(CarState.Move)

    }
    SetState(state:CarState)
    {
        if(this._carState != state && this._carState != CarState.Finish)
        {
            if (this._carState == CarState.DriftRight ||
                this._carState == CarState.DriftRight)
            {
                
            }
            this._carState = state
            this.ExecuteState()
        }
    }
    CheckDie(deltaTime:number)
    {

    }

    ExecuteState()
    {
        switch (this._carState)
        {
            case CarState.Die:
                this.EnterDieState()
                break
            case CarState.DriftLeft:
                this.EnterDriftLeftState()
                break
            case CarState.DriftRight:
                this.EnterDriftRightState()
			    break
            case CarState.Finish:
                break
            case CarState.Fly:
                break
            case CarState.Move:
                this.EnterMoveState()
                break
            case CarState.Invalid:
                break
        }
    }
    EnterDieState()
    {

    }
    EnterDriftLeftState()
    {

    }
    
    EnterDriftRightState()
    {

    }
    EnterMoveState()
    {
       // this.CorrectRotationY()
    }
    SimulateMoveState(deltaTime:number)
    {
        this.AddMoveSpeed(deltaTime)
        this.m_curMoveDir = this.node.forward
    }
    SimulateDieState(deltaTime:number)
    {

    }
    SimulateDriftState(vFrom:Vec3,deltaTime:number)
    {
        if (this.m_curMoveSpeed == 0)
        {
            this._carState = CarState.Move
            return;
        }
        let num = this.m_curMoveSpeed*deltaTime
        let num2 = this.m_curMoveSpeed*0.55
        let radian = (this._carState != CarState.DriftLeft ? 1 : -1 )* (num/num2)
        console.log(this.m_curMoveDir,"SimulateDriftState")
        //this.m_curMoveDir = this.RotateByY(this.m_curMoveDir,radian)
    }
    RotateByY(p:Vec3,radian:number)
    {
        let num = Math.cos(radian)
        let num2 = Math.sin(radian)
        let x = p.x*num - p.z*num2
        let y = p.y**num2 + p.z*num
        return new Vec3(x,y,p.z)
    }
    SimulateFinishState(deltaTime:number)
    {

    }
    SimulateFlyState(deltaTime:number)
    {

    }
    AddMoveSpeed(deltaTime:number)
    {
        const maxSpeed = 20
        if (this.m_curMoveSpeed < maxSpeed)
        {
            this.m_curMoveSpeed +=  maxSpeed*1.5*deltaTime
        }
        if (this.m_curMoveSpeed > maxSpeed)
        {
            this.m_curMoveSpeed = maxSpeed
        }
    }

    DoTurnFwd(deltaTime:number)
    {
        const targetAngle = Vec3.ZERO
        let flag = false
        if (this.isCanTurnFwd && this.m_bRoationing)
        {
            const angles = this.node.eulerAngles
            let y = angles.y
            const step = 576*deltaTime
            console.log(step)
            if (Math.abs(targetAngle.y-angles.y)<= Math.abs(step))
            {
                y =  targetAngle.y
                flag = true
            }
            else
            {
                y  +=  ((!(y > targetAngle.y))? step : -step)
            }
            this.node.eulerAngles = new Vec3(0,y,0)
            this.m_bRoationing = !flag
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
    private _onCollisionEnter(event:ICollisionEvent)
    {
        console.log(event)
        console.log(this.count++)
    }

    private _onCollisionExit(event:ICollisionEvent)
    {
        console.log(this.count--)
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
                tween(this.node).stop().to(0.175,{eulerAngles:new Vec3(0,-90,0)}).start()
                this.SetState(CarState.DriftRight)
            }
            else if(dir == 2)
            {
                tween(this.node).stop().to(0.175,{eulerAngles:new Vec3(0,0,0)}).start()
                this.SetState(CarState.DriftLeft)
            }
        }
    }
}

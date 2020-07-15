import { _decorator, Component, Node, Tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraCtrol')
export class CameraCtrol extends Component {
    @property(Node)
    private mTarget:Node = null;

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
    public followTarget(target:Node):void
    {
        this.mTarget = target
    }

    public update(deltaTime: number):void
    {
        this.node.worldPosition = this.mTarget.worldPosition;
    }
}

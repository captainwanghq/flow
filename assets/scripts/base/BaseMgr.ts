import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseMgr')
export default class BaseMgr extends Component {
    public moduleName: string = "gdkBaseModule";
    public moduleIndex: number = 0;
    public moduleData: object = {};

    public static _instance = null;
    public static getInstance(): any {
        let Class = this;
        if (!Class._instance) {
            Class._instance = Class._instance || new Class();
        }
        return Class._instance;
    }
    public static get instance() {
        return this.getInstance();
    }
    public  onLoad():void
    {

    }
}

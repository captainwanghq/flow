import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('base_mgr')
export default class base_mgr extends Component {
    private static _instance = null;
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
}

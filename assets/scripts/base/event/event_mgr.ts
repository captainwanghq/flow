import base_mgr from "../base_mgr";
import { _decorator, EventTarget } from 'cc';
const { ccclass } = _decorator;
@ccclass('event_mgr')
export default class event_mgr extends base_mgr
{
    private event_target = new EventTarget();
    // public on_events(events,target)
    // {
    //     for (let i = 0; i < events.length; i++) {
    //         let event = events[i];
    //         let moduleName = event[0] ? event[0].getInstance().moduleName : null;
    //         let eventType = event[1];
    //         let callback = event[2];
    //         callback = callback ? callback.bind(target) : null;
    //         this.on(moduleName, eventType, callback, target);
    //     }
    // }
    // public off_events(events,target)
    // {
    //     for (let i = 0; i < events.length; i++) {
    //         let event = events[i];
    //         let moduleName = event[0] ? event[0].getInstance().moduleName : null;
    //         let eventType = event[1];
    //         let callback = event[2];
    //         this.off(moduleName, eventType, callback, target);
    //     }
    // }
    
    public  emit(moduleName = "", eventType, data) {
        this.event_target.emit(`${moduleName}-${eventType}`, data);
    }
    public  on(moduleName = "", eventType, callback, target) {
        this.event_target.on(`${moduleName}-${eventType}`, callback, target);
    }
    public  off(moduleName = "", eventType, callback, target) {
        this.event_target.off(`${moduleName}-${eventType}`, callback, target);
    }
}
import base_mgr from "../base_mgr";
export default class EventMgr extends base_mgr
{
    public EventTarget = new cc.EventTarget();
    public onEvents(events,target)
    {
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            let moduleName = event[0] ? event[0].getInstance().moduleName : null;
            let eventType = event[1];
            let callback = event[2];
            callback = callback ? callback.bind(target) : null;
            this.on(moduleName, eventType, callback, target);
        }
    }
    public offEvents(events,target)
    {
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            let moduleName = event[0] ? event[0].getInstance().moduleName : null;
            let eventType = event[1];
            let callback = event[2];
            this.off(moduleName, eventType, callback, target);
        }
    }
    
    public run()
    {
       // this.EventTarget = new cc.EventTarget();
    }

    public  emit(moduleName = "", eventType, data) {
        this.EventTarget.emit(`${moduleName}-${eventType}`, data);
    }
    public  on(moduleName = "", eventType, callback, target) {
        this.EventTarget.on(`${moduleName}-${eventType}`, callback, target);
    }
    public  off(moduleName = "", eventType, callback, target) {
        this.EventTarget.off(`${moduleName}-${eventType}`, callback, target);
    }
}
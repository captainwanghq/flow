import Decorator  from "./Decorator"
import base_mgr from "./BaseMgr"
const g = {
    CustomDecorator:Decorator,
    BaseMgr:base_mgr,
    init() {
       
    }
}
window.g = g
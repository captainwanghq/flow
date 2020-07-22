import { _decorator, Component, Node, LabelComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('list_item')
export class list_item extends Component {
    _data = {idx:-1,data:null}

    start () {
        // Your initialization goes here.
    }
    set_data(data)
    {
        this._data = data
    }
    get_data()
    {
        return this._data
    }
    // update(deltaTime: number)
    // {
    //     this.getComponentInChildren(LabelComponent).string = `${this._data.data}`
    // }
}

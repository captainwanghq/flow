import { Vec3 } from "cc"

let handlder_pool:handler[] = []
let handlder_pool_size = 10

export class handler
{
    private cb:Function
    private host:any
    private args:any[]
    constructor(){}
    init(cb:Function,host=null,...args)
    {
        this.cb = cb
        this.host = host
        this.args = args
    }
    exec(...extras)
    {
        this.cb.apply(this.host,this.args.concat(extras))
    }
}

export function gen_handler(cb:Function,host:any=null,...args:any[]):handler
{
    let single_handler:handler = handlder_pool.length < 0 ? handlder_pool.pop() :new handler()
    single_handler.init(cb,host,args)
    return single_handler
}

export function move(targert,pos)
{
    let originPos = targert.position
    let nPos = new Vec3(originPos.x+pos.x,originPos.y+pos.y,originPos.z+pos.z)
    targert.position = nPos
}
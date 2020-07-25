import { Vec3, utils } from "cc"

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

class util{

    static to_array(o:Object)
    {
        const _array = []
        for (let k in o)
        {
            _array.push(o[k])
        }
        return _array
    }
    static to_auto_fixed(x:number)
    {
        return Math.round(x*100)/100
    }
    
    static to_format_big(val,fix_num:number=2,connect_str:string=null,forward:number=0)
    {
        // ae  ad ac ab aa t b m k
       if (val>= Math.pow(10,27))
       {
            return  util.to_auto_fixed((val/Math.pow(10,27))) + "ae"
       }
       else if (val>=Math.pow(10,24))
       {
            return  util.to_auto_fixed((val/Math.pow(10,24))) + "ad"
       }
       else if (val>=Math.pow(10,21))
       {
            return  util.to_auto_fixed((val/Math.pow(10,21))) + "ac"
       }
       else if (val>=Math.pow(10,18))
       {
        return  util.to_auto_fixed((val/Math.pow(10,18))) + "ab"
       }
       else if (val>=Math.pow(10,15))
       {
        return  util.to_auto_fixed((val/Math.pow(10,15))) + "aa"
       }
       else if (val>=Math.pow(10,12))
       {
        return  util.to_auto_fixed((val/Math.pow(10,12))) + "t"
       }
       else if (val>=Math.pow(10,9))
       {
        return  util.to_auto_fixed((val/Math.pow(10,9))) + "b"
       }
       else if (val>=Math.pow(10,6))
       {
        return  util.to_auto_fixed((val/Math.pow(10,6))) + "m"
       }
       else if (val>=Math.pow(10,3))
       {
        return  util.to_auto_fixed((val/Math.pow(10,3))) + "k"
       }
       return util.to_auto_fixed(val)
    }
    
    static to_smart_string(x:number)
    {
        if (x < 1000)
        {
            return util.to_auto_fixed(x).toString()
        }
        else{
            return util.to_format_big(x.toString())
        }
    }
}


export default util
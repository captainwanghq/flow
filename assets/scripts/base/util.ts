import { Vec3, utils ,loader ,SpriteFrame,Texture2D} from "cc"

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
    static prefix_integer(num)
    {
        if (num>0&&num<10)
        {
            return `0${num}`
        }
        return `${num}`
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

    static load_sprite(path,sprite)
    {
        const texture = loader.getRes(path,Texture2D)
        if(texture)
        {
            const spriteFrame = new SpriteFrame()
            spriteFrame.texture = texture;
            sprite.spriteFrame = spriteFrame;
        }
        else
        {
            loader.loadRes(path, Texture2D ,(err: any, texture: Texture2D) => {
                const spriteFrame = new SpriteFrame()
                spriteFrame.texture = texture;
                sprite.spriteFrame = spriteFrame;
            }); 
        }    
    }
}


export default util
class Frame
{
    time = 0;
    fill = "#000000";
    path = "";
}

class AnimatedPath
{
    frames = [];
    path = [];
    fill = "#000000";
    length = 0;
    /**
     * Splits a string into individual chunks likely to contain path information. 
     * @param {string} path The path string to be chunked.
     * @returns {string[]} The processed, chunked path.
     */        
    static chunk(path)
    {
        const out = [];
        let buf = "";
        let cmds =["l","v","h","c","q","z","m","a"];
        let nums =["0","1","2","3","4","5","6","7","8","9",".","-"];
        for(let i=0;i<path.length;i++)
        {
            let c = path[i];
            if(!nums.includes(c) && !cmds.includes(c.toLowerCase()))
            {
                out.push(buf);
                buf ="";
            }
            else
            {
                buf+=c;
            }
        }
        out.push(buf);
        return out;
    }
    /**
     * Compares a list of chunked paths and determines which elements are static and which are varialble.
     * @param {string[][]} paths List of chunked paths, each with the same number of commands.
     * @returns {[string[], Number[][]]} A list of strings (constant parts) and values (one per frame of an animation).
     */
    static diff(paths)
    {
        const strings = [];
        const values = new Array(paths.length);for(let i =0;i<paths.length;i++ )
            {
                values[i]= [];}
        let cur_str ="";
        paths[0].forEach((chunk, c)=>{
            let eq = true;
            let refval = paths[0][c];
            for(let i =0;i<paths.length;i++ )
            {//new Array(paths[0].length);
                if(paths[i][c]!=refval)
                {   
                    //console.log(refval, paths[i][c]);
                    eq = false;
                }
            }
            if(eq)
            {
                cur_str += chunk +" ";
            }
            else
            {
                strings.push(cur_str);
                cur_str = "";
                for(let i =0;i<paths.length;i++ )
                {
                    let val = parseFloat(paths[i][c]);
                    values[i].push(val);
                }
            }
        });
        
        strings.push(cur_str);
        return [strings, values];    
    }
    
    /**
     * Constructs a string by interleaving a list of strings and a list of values.
     * @param {string[]} strings An array of strings, should be 1 item longer than the values.
     * @param {Number[]} values An array of values, should be 1 item shorter than the strings.
     * @returns {string} a complete string.
     */
    static stitch(strings, values)
    {
        const result = [strings[0]];
        values.forEach((val, i) => {
            result.push(val,strings[i+1]);
        });
        return result.join(" ");
    }
    /**
     * Provides interpolated list of values given two lists and a value indicating the amount to lerp.
     * @param {Number[]} a first set of values
     * @param {Number[]} b second set of values
     * @param {Number} t amount to interpolate
     * @returns a list of values of equal size
     */
    static tween(a,b,t)
    {
        const c = [];
        a.forEach((val,i)=>{
            c.push(a[i]+(b[i]-val)*t);
        });
        return c;
    }
    static fromKeyFrames(frames)
    {
        let result = new AnimatedPath();
        let paths = [];
        frames.forEach((f)=>{
            result.frames.push({"time": f.time});
            result.fill = f.fill; // for now
            paths.push(f.path);
        });
        let chunked = [];
        paths.forEach((p)=>{
            chunked.push(AnimatedPath.chunk(p));
        });
        let output = AnimatedPath.diff(chunked);
        result.path = output[0];
        result.frames.forEach((f,i)=>{
            f.values = output[1][i];
            result.length = f.time;
        });
        return result;
    }
    findFrames(t)
    {
        let a,b,dT
        let i =0;
        let dS = 1;
        for(i=0; i<this.frames.length-1;i++)
        {
            a=this.frames[i];
            b=this.frames[i+1];
            dT = t-a['time'];
            dS = b['time']-a['time'];
            dT/=dS;
            if(t<=b['time'])
                break;
        }
        return {
            "a": a['values'], 
            "b": b['values'], 
            "t":dT
            };
    }
}

class VectorAnimation
{
    current_time = 0;
    length = 0.1;
    paths = [];
    name = "";
    constructor(paths, name)
    {
        this.name = name;
        paths.forEach((p)=>this.paths.push(p));
        this.length = this.paths[0].length;
    }
    draw(ctx)
    {
        for(let i =0;i<this.paths.length;i++)
        {
            let path = this.paths[i];
            let frame=path.findFrames(this.current_time);
            let values = AnimatedPath.tween(frame.a, frame.b, frame.t);
            let strpath = AnimatedPath.stitch(path.path, values);
            ctx.fillStyle = path.fill;
            ctx.fill(new Path2D(strpath));
        }
    }
    update(dT)
    {
        this.current_time+=dT;
        while(this.current_time>this.length)
        {
            this.current_time-=this.length;
        }
    }

}

class VectorSprite
{
    paths = [];
    animations = {};
    constructor(animations)
    {
        //console.log("yes");
        animations.forEach((a)=>{
            this.animations[a.name] = a;
        });
    }
    static fromRawObject(obj)
    {
        let anims = [];
        for(const [key, value] of Object.entries(obj)) 
        {
            let paths = [];
            value.forEach((p,i)=>{
                paths.push(AnimatedPath.fromKeyFrames(p));
            });
            anims.push(new VectorAnimation(paths, key));
        }
        return new VectorSprite(anims);
    }
}
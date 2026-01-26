/**
 * Represents a single path keyframe
 */
class Frame
{
    /**
    The time position of the keyframe
     */
    time = 0;
    /**
    Fill colour of the path
     */
    fill = "#000000";
    /**
    Path data in SVG path format
     */
    path = "";
}
/**
 * Represents a single part (path) with keyframe animation
 */
class AnimatedPath
{
    /**
    Array of keyframes
     */
    frames = [];
    /** Contains the "static" elements of the path data */
    path = [];
    /**
    Current fill colour
     */
    fill = "#000000";
    /**
    Animation length
     */
    length = 0;
    /**
     * Splits a string into individual chunks likely to contain path information. 
     * @param {string} path The path string to be chunked.
     * @returns {string[]} The processed, chunked path.
     */        
    static chunk(path)
    {
        const out = [];
        // this accumulates current piece
        let buf = "";
        // list of all path commands
        let cmds =["l","v","h","c","q","z","m","a"];
        // numeric param symbols
        let nums =["0","1","2","3","4","5","6","7","8","9",".","-"];
        for(let i=0;i<path.length;i++)
        {
            let c = path[i];
            // if hit anything that's not a number or a command, split off
            if(!nums.includes(c) && !cmds.includes(c.toLowerCase()))
            {
                out.push(buf);
                buf ="";
            }
            // else accumulate
            else
            {
                buf+=c;
            }
        }
        // split off current buffer
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
        // keeps a list of unchanging items
        const strings = [];
        // keeps a list of items that change in keyframes
        const values = new Array(paths.length);
        // init an array of arrays for each frame
        for(let i =0;i<paths.length;i++ )
        {
            values[i]= [];
        }
        // accumulator
        let cur_str ="";
        // go through every separate chunk in the first frame
        // and find out if it changes in any other frames
        paths[0].forEach((chunk, c)=>{
            // this keeps track whether a different value was found
            let eq = true;
            // this is the reference value to compare to
            let refval = paths[0][c];
            // go through every frame 
            for(let i =0;i<paths.length;i++ )
            {
                // compare the corresponding chunk in this frame
                if(paths[i][c]!=refval)
                {   
                    // if difference found, set the flag
                    eq = false;
                }
            }
            // if no difference found, add the chunk as is to accumulator
            if(eq)
            {
                cur_str += chunk +" ";
            }
            else
            {
                // otherwise, split the accumulator off
                strings.push(cur_str);
                cur_str = "";
                // insert the changed chunk as a new value in each frame
                for(let i =0;i<paths.length;i++ )
                {
                    let val = parseFloat(paths[i][c]);
                    values[i].push(val);
                }
            }
        });
        // split the last accumulator off and finish
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
        // basically lerp between corresponding values in the two arrays
        a.forEach((val,i)=>{
            c.push(a[i]+(b[i]-val)*t);
        });
        return c;
    }
    /**
     * Creates an AnimatedPath out of an array of keyframes
     * @param {Array} frames 
     * @returns 
     */
    static fromKeyFrames(frames)
    {
        let result = new AnimatedPath();
        let paths = [];
        // add the frames to the new object
        frames.forEach((f)=>{
            result.frames.push({"time": f.time});
            result.fill = f.fill; // for now
            // also save the paths in parallel for processing
            paths.push(f.path);
        });
        let chunked = [];
        // chunk the paths
        paths.forEach((p)=>{
            chunked.push(AnimatedPath.chunk(p));
        });
        // process chunked paths to extract only the changing values
        let output = AnimatedPath.diff(chunked);
        // set the static path data
        result.path = output[0];
        // set the changing values
        result.frames.forEach((f,i)=>{
            f.values = output[1][i];
            // update path animation length to the highest time value seen
            result.length = f.time;
        });
        return result;
    }
    /**
     * Locates the correct keyframes corresponding to the time given
     * @param {number} t 
     * @returns an object containing:
     * "a", the values for previous frame, 
     * "b", the values for next frame,
     * "t", the interpolation parameter between the frames
     */
    findFrames(t)
    {
        let a,b,dT
        let i =0;
        let dS = 1;
        // go through all frames
        for(i=0; i<this.frames.length-1;i++)
        {
            // candidate a & b
            a=this.frames[i];
            b=this.frames[i+1];
            // calculate how far ahead of "a"
            dT = t-a['time'];
            // time between "a" and "b"
            dS = b['time']-a['time'];
            // calculate lerp value between the two
            dT/=dS;
            // return everything if the candidate b is after T
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
    fade_time = 0;
    fade_start = 0;
    fade_fill="";
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
            if(this.fade_time>0 && this.fade_start > 0)
            {
                let a = this.fade_time / this.fade_start;
                ctx.fillStyle = "rgb("+this.fade_fill+" / " + a + ")";
                ctx.fill(new Path2D(strpath));
            }
        }
    }
    update(dT)
    {
        this.current_time+=dT;
        this.fade_time-=dT;
        if(this.fade_time<=0)
        {
            this.fade_time=0;
            this.fade_start = 0;
        }
        while(this.current_time>this.length)
        {
            this.current_time-=this.length;
        }
    }
    applyFade(colour, time, a=1)
    {
        this.fade_fill=colour;
        this.fade_time=time;
        this.fade_start=time / a;
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
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
     * Tweens between two fill values. Currently only supports #RRGGBB strings.
     * @param {*} a 
     * @param {*} b 
     * @param {*} t 
     * @returns 
     */
    static tweenFill(a,b,t)
    {
        if(typeof a == "string")
        {
            return AnimatedPath.tweenHex(a,b,t);
        }

    }
    /**
     * Tweens between two hex colours
     * @param {string} a first colour as #RRGGBB
     * @param {string} b second colour as #RRGGBB
     * @param {string} t amount to interpolate
     * @returns interpolated colour as #RRGGBB or #000000 if invalid format
     */
    static tweenHex(a,b,t)
    {
        if(a[0]!="#")
        {
            return "#000000";
        }
        let ar = parseInt(a.substring(1,3),16);
        let ag = parseInt(a.substring(3,5),16);
        let ab = parseInt(a.substring(5,7),16);
        let br = parseInt(b.substring(1,3),16);
        let bg = parseInt(b.substring(3,5),16);
        let bb = parseInt(b.substring(5,7),16);
        let R = ar + (br-ar)*t;
        let G = ag + (bg-ag)*t;
        let B = ab + (bb-ab)*t;
        return AnimatedPath.rgbToHex(Math.floor(R), Math.floor(G), Math.floor(B));
    }
    static rgbToHex(r, g, b) 
    {
        return "#" + AnimatedPath.componentToHex(r) + AnimatedPath.componentToHex(g) + AnimatedPath.componentToHex(b);
    }
    static componentToHex(c) 
    {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
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
            // also save the paths in parallel for processing
            paths.push(f.path);
            result.frames.push({"time": f.time, "fill":f.fill,"rotation":(f.rotation ?? 0)});
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
            "ra":a['rotation'],
            "fa":a['fill'],
            "b": b['values'], 
            "rb":b['rotation'],
            "fb":b['fill'],
            "t":dT
            };
    }
}

/**
 * Represents one complete animation containing keyframed paths.
 */
class VectorAnimation
{
    /**
     * Position in the timeline
     */
    current_time = 0;
    /**
     * Length of the animation in seconds
     */
    length = 0.1;
    /**
     * Array of AnimatedPaths contained in the animation
     */
    paths = [];
    /**
     * Name used to refer to the animation
     */
    name = "";
    /**
     * Time left on the tint/fade effect
     */
    fade_time = 0;
    /**
     * Full duration of the fade effect
     */
    fade_start = 0;
    /**
     * Colour used for the fade effect
     */
    fade_fill="";
    /**
     * Creates a new instance of an animation given a list of animated paths and a name
     * @param {AnimatedPath[]} paths 
     * @param {string} name 
     */
    constructor(paths, name)
    {
        this.name = name;
        paths.forEach((p)=>this.paths.push(p));
        // fix the animation's length to the length of the first path given
        this.length = this.paths[0].length;
    }
    /**
     * Draws the animation in its current state
     * Drawing origin is 0,0 - translate the canvas to draw in a different location.
     * @param {CanvasRenderingContext2D} ctx - canvas context to use 
     */
    draw(ctx)
    {
        // draw each path
        for(let i =0;i<this.paths.length;i++)
        {
            let path = this.paths[i];
            // get the two frames to tween 
            let frame=path.findFrames(this.current_time);
            let values = AnimatedPath.tween(frame.a, frame.b, frame.t);
            // tween rotation
            let rot = frame.ra + (frame.rb-frame.ra)*frame.t;
            // generate the SVG path commands from the path and the keyframe values
            let strpath = AnimatedPath.stitch(path.path, values);
            // tween fill
            let fill = AnimatedPath.tweenFill(frame.fa, frame.fb, frame.t);
            // render the path in its fill colour
            ctx.fillStyle = fill;
            // rotate
            ctx.rotate(rot/180*Math.PI);
            ctx.fill(new Path2D(strpath));
            // if a fade is applied, also render the fade
            if(this.fade_time>0 && this.fade_start > 0)
            {
                // calculate the fade intensity
                let a = this.fade_time / this.fade_start;
                ctx.fillStyle = "rgb("+this.fade_fill+" / " + a + ")";
                ctx.fill(new Path2D(strpath));
            }
            // unrotate
            ctx.rotate(-rot*Math.PI/180);
        }
    }
    /**
     * Update animation state
     * @param {number} dT - elapsed time
     */
    update(dT)
    {
        // progress timeline and fade timer
        this.current_time+=dT;
        this.fade_time-=dT;
        // set fade params to zero if fade expired
        if(this.fade_time<=0)
        {
            this.fade_time=0;
            this.fade_start = 0;
        }
        // wrap around timeline if past length
        while(this.current_time>this.length)
        {
            this.current_time-=this.length;
        }
    }
    /**
     * Applies a fading colour tint effect
     * @param {string} colour - colour to use, in decimal "R G B" format
     * @param {number} time - seconds before the effect fully fades out
     * @param {number} a - intensity of the effect at the start from 0 to 1, where 1 is solid colour 
     */
    applyFade(colour, time, a=1)
    {
        this.fade_fill=colour;
        this.fade_time=time;
        // if a is not 1, this sets a fake "start" time to start out the effect at the desired intensity
        this.fade_start=time / a;
    }
}
/**
 * Represents a complete graphics object with a collection of VectorAnimations
 */
class VectorSprite
{
    /**
     * Contains the VectorAnimations, referenced by name
     */
    animations = {};
    /**
     * Creates a new instance given a set of animations
     * @param {VectorAnimation[]} animations 
     */
    constructor(animations)
    {
        // add each animation by its name
        animations.forEach((a)=>{
            this.animations[a.name] = a;
        });
    }
    /**
     * Creates a VectorSprite out of a raw JSON object
     * @param {array} obj 
     * @returns 
     */
    static fromRawObject(obj)
    {
        let anims = [];
        // get every animation by name
        for(const [key, value] of Object.entries(obj)) 
        {
            let paths = [];
            // create an AnimatedPath out of every path in the array and add
            value.forEach((p,i)=>{
                paths.push(AnimatedPath.fromKeyFrames(p));
            });
            // create an animation out of each set of paths and add to animations
            anims.push(new VectorAnimation(paths, key));
        }
        // create and return the vector sprite
        return new VectorSprite(anims);
    }
}
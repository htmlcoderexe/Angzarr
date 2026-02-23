/**
 * Base class for UI elements that are drawn on screen and interacted with.
 */
class UIElement
{
    /**
     * Element's hitbox, before displacement
     */
    hitbox = new Rectangle(0,0,1,1);
    /**
     * Element's hitbox, after displacement
     */
    originalHitbox = new Rectangle(0,0,1,1);
    children = [];
    parent = null;
    uimgr = null;
    layer = "system";
    id="";
    get h() {
        return this.originalHitbox.height;
    }
    get w() {
        return this.originalHitbox.width;  
    }
    eventHandlers = {};
    eventFilters = {};
    constructor(rekt)
    {
        this.hitbox= new Rectangle(...rekt);
        this.originalHitbox = new Rectangle(...rekt);
    }
    /**
     * Updates the element's state
     * @param {number} dT 
     */
    update(dT)
    {
        // base implementation just recursively updates children
        this.children.forEach((c)=>{
            c.update(dT);
        });
    }
    /**
     * Draws the element to the canvas
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx)
    {
        ctx.translate(this.originalHitbox.x,this.originalHitbox.y);
        this.drawControl(ctx);
        // this might be needed later to properly offset child controls?
        // ctx.translate(this.hitbox.x,this.hitbox.y);
        // base implementation just recursively draws children
        this.children.forEach((c)=>{
            c.draw(ctx);
        });
        ctx.translate(-this.originalHitbox.x,-this.originalHitbox.y);
        
        
    }
    drawControl(ctx)
    {

    }
    add(control)
    {
        this.children.push(control);
        control.parent=this;
        control.uimgr = this.uimgr;
        //console.log("added ");
        //console.log(control);
    }
    find(id)
    {
        //console.log(id,this.id);
        if(this.id==id)
            {
                //console.log("FUCK <",id,"> FOUND");
                return this;
            }
        let result = null;
        this.children.forEach((c)=>{
            let result2 = c.find(id);
            //console.log(id,result2);
            if(result2)
                result = result2;
        });
        return result;
    }
    /**
     * Givent a point on the screen, find the most specific (nested) control it hits and nest it.
     * @param {int} x - Screen X
     * @param {int} y - Screen Y
     * @returns 
     */
    checkhit(x, y)
    {
        // if this control contains the point, check if we can be more specific
        if(this.hitbox.testPoint(x,y))
        {
            // if any sub-controls, check each
            
            // either there are no sub-controls, or none got hit
            return this;
        }
        // if point outside control, return nothingness
        else
        {
            return null;
        }
    }
    getChildrenBBox()
    {
        let mX =0;
        let mY=0;
        this.children.forEach((c)=>{
            let nx = c.hitbox.x+c.hitbox.width;
            let ny = c.hitbox.y+c.hitbox.height;
            mX=Math.max(mX,nx);
            mY=Math.max(mY,ny);
        });
        return [mX,mY];
    }
    /**
     * Attaches a handler to a specific event.
     * @param {string} event Event to be handled
     * @param {callback} handler Event handler. If this returns true, 
     * the element's children, if any, will not be receiving the event.
     */
    addEventListener(event, handler)
    {
        if(!this.eventHandlers[event])
        {
            this.eventHandlers[event]= [];
        }
        this.eventHandlers[event].push(handler);
        console.log("Event listener for <"+event+"> installed");
    }
    /**
     * Adds a parameter filter for a specific event.
     * The filter function modifies incoming event args
     * before they are passed onto child elements.
     * Multiple filters may be installed and are run in order of installation.
     * @param {string} event Event to install the filter for
     * @param {callback} handler Filter function. This must return an array 
     * containing the entire set of args, whether or not any have been modified.
     */
    addEventFilter(event, handler)
    {
        if(!this.eventFilters[event])
        {
            this.eventFilters[event]= [];
        }
        this.eventFilters[event].push(handler);
        console.log("Event filter for <"+event+"> installed");
    }
    /**
     * Calls any event handlers installed, 
     * filters the parameters with available filters 
     * and attempts to propagate event to child elements.
     * @param {string} name event name
     * @param  {...any} params event args
     * @returns 
     */
    raiseEvent(name, ...params)
    {
        console.log("Event <"+name+"> triggered with params", params);
        let handled = false;
        // check for event handlers on this element
        if(this.eventHandlers[name])
        {
            // run all handlers, if any of them return true,
            // consider the event handled
            this.eventHandlers[name].forEach((handler)=>{
                handled = handled || handler(...params);
            });
            console.log(this.eventHandlers[name].length+" event handlers processed.");
        }
        // if not yet handled, pass event to children
        if(!handled && this.children.length>0)
        {
            // run any filters on the params
            if(this.eventFilters[name])
            {
                this.eventFilters[name].forEach((handler)=>{
                    params = handler(...params);
                });
                console.log(this.eventFilters[name].length+" event filters processed.");
            }
            // not all events have x,y but if they do it will be the first 2
            if(params.length>=2)
            {
                let x = params[0];
                let y = params[1];
                // basically check if any child elements accept the event
                for(let i =0;i<this.children.length;i++)
                {
                    const child = this.children[i].checkhit(x,y);
                    if(child)
                    {
                        // pass the event, modifying x,y relative to the target
                        params[0]=x-child.hitbox.x;
                        params[1]=y-child.hitbox.y;
                        let handled2 = child.raiseEvent(name, ...params);
                        if(handled2)
                            return true;
                    }
                }
            }
        }
        return handled;
    }


}
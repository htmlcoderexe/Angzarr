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
    layer = "system";
    id="";
    clickHandler = ()=>{};
    constructor(rekt)
    {
        this.hitbox= new Rectangle(rekt.x,rekt.y,rekt.width,rekt.height);
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
        // this might be needed later to properly offset child controls?
        // ctx.translate(this.hitbox.x,this.hitbox.y);
        // base implementation just recursively draws children
        this.children.forEach((c)=>{
            c.draw(ctx);
        });
        
        
    }
    add(control)
    {
        this.children.push(control);
        control.parent=this;
        console.log("added ");
        console.log(control);
    }
    find(id)
    {
        console.log(id,this.id);
        if(this.id==id)
            {
                console.log("FUCK <",id,"> FOUND");
                return this;
            }
        let result = null;
        this.children.forEach((c)=>{
            let result2 = c.find(id);
            console.log(id,result2);
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
            if(this.children.length>0)
            {
                for(let i =0;i<this.children.length;i++)
                {
                    // recursion! if something got hit, it will either return itself or get even more specific.
                    const child = this.children[i].checkhit(x,y);
                    if(child)
                    {
                        return child;
                    }
                }
            }
            // either there are no sub-controls, or none got hit
            return this;
        }
        // if point outside control, return nothingness
        else
        {
            return null;
        }
    }
    addEventListener(event, handler)
    {
        if(event=="click")
        {
            this.clickHandler=handler;
            return true;
        }
        return false;
    }
    /**
     * Clicks the control.
     * @param {PointerEvent} e 
     */
    click(e)
    {
        // just call the clickhandler for now
        this.clickHandler();
    }


}
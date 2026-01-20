class UIElement
{
    hitbox = new Rectangle(0,0,1,1);
    originalHitbox = new Rectangle(0,0,1,1);
    children = [];
    parent = null;
    clickHandler = ()=>{};
    constructor(rekt)
    {
        this.hitbox= new Rectangle(rekt.x,rekt.y,rekt.width,rekt.height);
    }
    update(dT)
    {
        this.children.forEach((c)=>{
            c.update(dT);
        });
    }
    draw(ctx)
    {
        //ctx.resetTransform();
        //ctx.translate(this.hitbox.x,this.hitbox.y);
        this.children.forEach((c)=>{
            c.draw(ctx);
        });
        
        
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

    click(e)
    {
        this.clickHandler();
    }


}
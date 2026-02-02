class UISelector extends UIElement
{
    options = [];
    selectedIndex = 0;
    arrowPadding = 0;
    arrowWidth=32;
    constructor(rekt, options)
    {
        super(rekt);
        this.options=options;
    }
    changedHandler=()=>{};
    draw(ctx)
    {
        let x=this.hitbox.x;
        let y=this.hitbox.y;
        let w=this.hitbox.width;
        let h=this.hitbox.height;
        UIRenderer.drawFrame(ctx, x+this.arrowWidth+15,y,w-this.arrowWidth*2-30,h);
        // left arrow
        ctx.fillStyle="#802000"
        if(this.selectedIndex>0)
        {
            ctx.beginPath();
            ctx.moveTo(x, y+h/2);
            ctx.lineTo(x+this.arrowWidth, y+this.arrowPadding);
            ctx.lineTo(x+this.arrowWidth, y+h-this.arrowPadding);
            ctx.closePath();
            ctx.fill();
        }
        if(this.selectedIndex<this.options.length-1)
        {
            ctx.beginPath();
            ctx.moveTo(x+w, y+h/2);
            ctx.lineTo(x+w-this.arrowWidth, y+this.arrowPadding);
            ctx.lineTo(x+w-this.arrowWidth, y+h-this.arrowPadding);
            ctx.closePath();
            ctx.fill();
        }
        super.draw(ctx);
    }
    addEventListener(event, handler)
    {
        if(super.addEventListener(event,handler))
            return true;
        switch(event)
        {
            case "change":
            {
                this.changedHandler=handler;
                return true;
            }
        }
        return false;
    }
    click(e)
    {
        let x = e.offsetX-this.hitbox.x;
        let y = e.offsetY-this.hitbox.y;
        if(x<60)
        {
            // left arrow click
            if(this.selectedIndex>0)
            {
                this.selectedIndex--;
                this.changedHandler();
            }
            return true;
        }
        if(x>this.hitbox.width-60)
        {
            if(this.selectedIndex<this.options.length-1)
            {
                this.selectedIndex++;
                this.changedHandler();
            }
            return true;
        }
        super.click(e);
        return true;
    }
}
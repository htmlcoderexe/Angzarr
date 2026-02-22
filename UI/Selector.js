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
    drawControl(ctx)
    {
        let w=this.hitbox.width;
        let h=this.hitbox.height;
        UIRenderer.drawFrame(ctx, this.arrowWidth+15,0,w-this.arrowWidth*2-30,h);
        // left arrow
        ctx.fillStyle="#802000"
        if(this.selectedIndex>0)
        {
            ctx.beginPath();
            ctx.moveTo(0, 0+h/2);
            ctx.lineTo(this.arrowWidth, this.arrowPadding);
            ctx.lineTo(this.arrowWidth, h-this.arrowPadding);
            ctx.closePath();
            ctx.fill();
        }
        if(this.selectedIndex<this.options.length-1)
        {
            ctx.beginPath();
            ctx.moveTo(w, h/2);
            ctx.lineTo(w-this.arrowWidth, this.arrowPadding);
            ctx.lineTo(w-this.arrowWidth, h-this.arrowPadding);
            ctx.closePath();
            ctx.fill();
        }
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
    click(x,y)
    {
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
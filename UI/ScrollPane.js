class ScrollPane extends UIElement
{
    offsetY =0;

    draw(ctx)
    {
        
        ctx.save();
        ctx.translate(this.originalHitbox.x,this.originalHitbox.y);
        this.drawControl(ctx);
        // this might be needed later to properly offset child controls?
        // ctx.translate(this.hitbox.x,this.hitbox.y);
        // base implementation just recursively draws children
        ctx.beginPath();
        ctx.rect(0,0,this.hitbox.width,this.hitbox.height);
        ctx.clip();
        ctx.translate(0,this.offsetY);
        this.children.forEach((c)=>{
            c.draw(ctx);
        });
        ctx.restore();
        return;
        ctx.translate(0,-this.offsetY);
        ctx.beginPath();
        ctx.rect(...this.uimgr.hitbox);
        ctx.clip();
        ctx.translate(-this.originalHitbox.x,-this.originalHitbox.y);
    }
    swipeHandler=(x,y,dx,dy)=>{
        this.offsetY+=dy;
        if(this.offsetY+this.h<0)
            this.offsetY= -this.h;
        if(this.offsetY>0)
            this.offsetY=0;
        return true;
    };
    click(x,y)
    {
        super.click(x,y-this.offsetY);
    }
}
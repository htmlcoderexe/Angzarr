class ScrollPane extends UIElement
{
    offsetY =0;
    momentum = 0;
    maxrate=15;
    friction=0.4;
    moverate=1;
    lastswipe=0;
    diff=0;
    update(dT)
    {
        let contentHeight = this.getChildrenBBox()[1];
        this.diff = contentHeight-this.h;
        if(this.diff<0)
        {
            this.diff=0;
        } 
        this.momentum*=Math.pow(this.friction,dT);
        console.log(this.momentum);
        if(Math.abs(this.momentum)<0.5)
        {
            this.momentum=0;
        }
        this.offsetY+=this.momentum*this.moverate;
        if(this.offsetY+this.diff<0)
            this.offsetY= -this.diff;
        if(this.offsetY>0)
            this.offsetY=0;
}
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
    constructor(rekt)
    {
        super(rekt);
        this.addEventFilter("click",(x,y)=>{
            return [x,y-this.offsetY];
        });
        this.addEventListener("swipe",(x,y,dx,dy)=>{
            this.momentum=0;
            this.offsetY+=dy;
            this.lastswipe=dy;
            if(this.offsetY+this.diff<0)
                this.offsetY= -this.diff;
            if(this.offsetY>0)
                this.offsetY=0;
            });
        this.addEventListener("drag",(x,y,dx,dy)=>{
            this.momentum=Math.min(this.lastswipe,this.maxrate);
            return true;
        });
    }
}
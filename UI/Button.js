class UIButton extends UIElement
{
    text ="";
    bgcolor="#FF9000";
    constructor(rekt)
    {
        super(rekt);
        
    }
    draw(ctx)
    {
        ctx.save();
        ctx.fillStyle=this.bgcolor;
        ctx.fillRect(this.hitbox.x,this.hitbox.y,this.hitbox.width,this.hitbox.height);
        ctx.restore();
        super.draw(ctx);
    }
}
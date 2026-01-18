class UIButton extends UIElement
{
    text ="";
    bgcolor="#FF9000";
    constructor(rekt)
    {
        super();
        this.hitbox= new Rectangle(rekt.x,rekt.y,rekt.width,rekt.height);
        
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
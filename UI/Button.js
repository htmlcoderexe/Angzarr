/**
 * Represents a clickable button
 */
class UIButton extends UIElement
{
    /**
     * Button text
     */
    text ="";
    // #TODO: fuck this
    bgcolor="#FF9000";
    constructor(rekt)
    {
        super(rekt);
        
    }
    draw(ctx)
    {
        // this is horrible, draw an actual button, noob
        ctx.save();
        ctx.fillStyle=this.bgcolor;
        ctx.fillRect(this.hitbox.x,this.hitbox.y,this.hitbox.width,this.hitbox.height);
        ctx.restore();
        super.draw(ctx);
    }
}
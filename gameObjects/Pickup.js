/**
 * Defines a pickup item that can be collected by the player
 */
class Pickup extends GameObject
{
    constructor()
    {
        super("pickup");
        this.screenMovement=RELATIVE_MOVEMENT_GRAVITY;
    }
    draw(ctx)
    {
        super.draw(ctx);
        ctx.fillStyle="#FFFF00";
        ctx.fillRect(this.x-5,this.y-5,10,10);
    }
}
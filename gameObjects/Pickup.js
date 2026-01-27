/**
 * Defines a pickup item that can be collected by the player
 */
class Pickup extends GameObject
{
    constructor()
    {
        super("pickup");
        this.screenMovement=RELATIVE_MOVEMENT_GRAVITY;
        this.hitbox = new Rectangle(-10,-10,20,20);
        this.originalHitbox = new Rectangle(-10,-10,20,20);
    }
    draw(ctx)
    {
        super.draw(ctx);
        ctx.fillStyle="#FFFF00";
        ctx.fillRect(this.x-10,this.y-10,20,20);
    }
}
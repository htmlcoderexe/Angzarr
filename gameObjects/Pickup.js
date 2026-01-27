/**
 * Defines a pickup item that can be collected by the player
 */
class Pickup extends GameObject
{
    constructor()
    {
        super("pickup");
        this.screenMovement=RELATIVE_MOVEMENT_GRAVITY;
        this.hitbox = new Rectangle(-50,-50,100,100);
        this.originalHitbox = new Rectangle(-50,-50,100,100);
    }
    draw(ctx)
    {
        super.draw(ctx);
        ctx.fillStyle="#FFFF00";
        ctx.fillRect(this.x-20,this.y-20,40,40);
    }
}
/**
 * Represents a basic "bullet" object
 */
class Projectile extends GameObject
{
    /**
    Determines if the projectile harms enemies or the player ('s allies)
     */
    friendly = false;
    /**
    Damage dealt by this projectile on hitting a target
     */
    damage = 4;
    constructor()
    {
        super("bullet");
        // default oblong projectile
        this.hitbox = new Rectangle(-5,-5,10,30);
        this.originalHitbox = new Rectangle(-5,-5,10,30);
        
    }
    draw(ctx)
    {
        // define a trail fading from yellow to orange
        // #TODO: something less hardcoded
        const grad = ctx.createLinearGradient(this.x,this.y-5,this.x,this.y+30);
        grad.addColorStop(0, "rgb(255 255 0)");
        grad.addColorStop(1,"rgb(255 120 0 / 0.2)");
        ctx.fillStyle = grad;
        ctx.fillRect(this.x-5,this.y-5,10,30);
    }
    /**
     * Defines what happens when this collides with an entity
     * @param {Actor} other 
     */
    hit(other)
    {
        // deal damage and disappear
        other.damage(this.damage);
        this.die();
    }
    update(dT)
    {
        if(this.isDead)
            return;
        super.update(dT);
        // clean up bullets that are outside of the screen
        if(this.x<0 || this.x>10000 || this.y<0 || this.y>10000)
        {
            this.isDead=true;
        }
    }
}
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
    constructor(shape)
    {
        super("bullet");
        // default oblong projectile
        this.hitbox = new Rectangle(-5,-5,10,30);
        this.originalHitbox = new Rectangle(-5,-5,10,30);
        this.sprite=VectorSprite.fromRawObject(shape);
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
    static fromTemplate(template)
    {
        let result = new Projectile(ProjectileData.graphics[template.sprite]);
        result.hitbox = new Rectangle(...template.rect);
        result.speed = template.speed;
        result.damage = template.damage;

        return result;
    }
}
/**
 * These are the bad guys or whatever.
 */
class Hostile extends Actor
{
    constructor(gfx=null)
    {
        super(gfx, "hostile"); 
        // init some "basic" default values
        this.speed= 100;
        this.hitbox = new Rectangle(-25,-25,50,50);
        this.originalHitbox = new Rectangle(-25,-25,50,50);
    }
    update(dT)
    {
        super.update(dT);
        // home in on the player #TODO: dynamic behaviours
        this.targetX = this.scene.player.x;
        this.targetY = this.scene.player.y;
    }
    static fromTemplate(template)
    {
        let result = new Hostile(HostileData.graphics[template.sprite]);
        result.MaxHP=template.health;
        result.HP=template.health;
        result.hitbox = new Rectangle(...template.rect);
        result.originalHitbox = new Rectangle(...template.rect);
        result.speed=template.speed;
        return result;
    }
}
/**
 * Defines a pickup item that can be collected by the player
 */
class Pickup extends GameObject
{
    effect = null;
    item = null;
    coins = 0;
    constructor(sprite)
    {
        super("pickup");
        this.hitbox = new Rectangle(-50,-50,100,100);
        this.originalHitbox = new Rectangle(-50,-50,100,100);
        this.sprite=sprite ?? GraphicsData.get("pickup_coin");
       
    }
    static fromTemplate(template)
    {
        const sprite = GraphicsData.get(template.sprite);
        const result = new Pickup(sprite);
        // still
        if(!template.gravity)
        {
            result.screenMovement=RELATIVE_MOVEMENT_STATIC;
        }
        // scatter
        else
        {
            result.screenMovement=RELATIVE_MOVEMENT_GRAVITY;
            result.movementVector.y=-5;
            result.movementVector.x=-2+Math.random()*4;
        }
        result.coins=template.coins??0;
        result.item = template.item; 
        result.effect = template.effect;
        return result;
    }
}
/**
 * Represents an object in the game that can be drawn and updated.
 */
class GameObject
{
    /**
    Basic type of an object.
     */
    type = "object";
    /**
    Reference to the scene the object belongs to.
     */
    scene = null;
    /**
    X coordinate of the object.
     */
    x = 0;
    /**
    Y coordinate of the object.
     */
    y = 0;
    /**
    X coordinate the object is currently moving towards.
     */
    targetX = 0;
    /**
    Y coordinate the object is currently moving towards.
     */
    targetY = 0;
    /**
    Speed of the movement towards target coordinates.
     */
    speed = 0;
    /**
    If object is dead, it shall not be updated or drawn.
     */
    isDead = false;
    /**
    The hitbox of the object without translation to object's coordinates.
     */
    originalHitbox = null;
    /**
    The hitbox of the object relative to the screen, translated by its coordinates.
     */
    hitbox = null;
    /**
     * Creates an instance of the object given type
     * @param {string} type - the type of the object.
     */
    constructor(type)
    {
        this.type = type;
        // init some default values
        this.originalHitbox = new Rectangle(0,0,1,1);
        this.hitbox = new Rectangle(0,0,1,1);
    }
    /**
     * Function to run on object's death.
     */
    onDeath = function(){};
    /**
     * Makes the object die and runs onDeath()
     */
    die()
    {
        this.onDeath();
        this.isDead=true;
    }
    /**
     * Updates the object's hitbox
     */
    recalcHitbox()
    {
        
        this.hitbox.x= this.originalHitbox.x+this.x;
        this.hitbox.y=this.originalHitbox.y+this.y;
        this.hitbox.width = this.originalHitbox.width;
        this.hitbox.height = this.originalHitbox.height;
    }
    /**
     * Updates the object's state given elapsed time.
     * @param {number} dT - elapsed time 
     * @returns 
     */
    update(dT)
    {
        // don't do anything if object is dead
        if(this.isDead)
            return;
        // skipping unnecessary recalculation
        if(this.speed==0 || (this.x==this.targetX && this.y == this.targetY))
        {
            this.recalcHitbox();
            return;
        }
        // move the object towards the target
        // calculate distances in X and Y
        const xDiff = this.targetX-this.x;
        const yDiff = this.targetY-this.y;
        // get the angle pointing towards target
        const axisAngle = Math.atan2(yDiff,xDiff);
        // get offsets based on the angle and object's speed
        const dX = this.speed * Math.cos(axisAngle) * dT;
        const dY = this.speed * Math.sin(axisAngle) * dT;
        this.x+=dX;
        this.y+=dY;
        // if the new offset "overshoots" the destination,
        // snap the object to the destination coordinate
        // this prevents jitter
        if(Math.abs(xDiff)<Math.abs(dX))
        {
            this.x=this.targetX;
        }
        if(Math.abs(yDiff)<Math.abs(dY))
        {
            this.y=this.targetY;
        }
        this.recalcHitbox();
    }
    /**
     * Draws the object using given canvas context.
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx)
    {

    }
}
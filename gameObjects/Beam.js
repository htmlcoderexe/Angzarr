/**
 * Vertical beam that can collide with stuff
 */
class VerticalBeam extends GameObject
{
    /**
    Determines whether this damages enemies or allies.
     */
    friendly = false;
    /**
    Base damage
     */
    damage = 30;
    /**
    Damage tick cooldown
     */
    hitmaxcd=2;
    /**
    Keeps track of current cooldown
     */
    hitcd=0;
    /**
    The beam fades to nothing over this time.
     */
    maxfade = 1.0;
    /**
    Keeps track of the fade-out.
    If this is lower than maxfade, the beam is drawn proportionally faded out,
    else it is drawn at full intensity. 
    */
    fadetimer = 1.0;
    /**
    Beam "core" colour
     */
    innerColour = [200,255,220,1];
    /**
    Beam "edge" colour, best set to 0 alpha for soft edge
     */
    outerColour = [20,200,150,0.0];
    /**
     * Initialises a beam at specific coordinates
     * @param {number} width - beam width
     * @param {number} startX - beam origin X
     * @param {number} startY - beam origin Y
     * @param {number} endX - beam target X, unused for vertical beam
     * @param {number} endY - beam target Y
     */
    constructor(width, startX, startY, endX, endY)
    {
        super("beam");
        // set up hitbox
        this.hitbox = new Rectangle(
            startX-width/2,
            startY,
            width,
            endY-startY
        );
        this.originalHitbox  = new Rectangle(
            startX-width/2,
            startY,
            width,
            endY-startY
        );
    }
    draw(ctx)
    {
        // set up a horisontal gradient
        const grad = ctx.createLinearGradient(this.hitbox.x,0,this.hitbox.x+this.hitbox.width,0);
        // calculate the transparency based on the fade timer
        // the defaults start fading the beam halfway through the timer
        // alpha is clamped to not exceed 1
        let fade=Math.min(1,(2*this.fadetimer/this.maxfade));
        // gradient goes edge -> core in the middle -> edge
        grad.addColorStop(0, `rgb(${this.outerColour[0]} ${this.outerColour[1]} ${this.outerColour[2]}/ ${this.outerColour[3] * fade})`);
        grad.addColorStop(0.5, `rgb(${this.innerColour[0]} ${this.innerColour[1]} ${this.innerColour[2]}/ ${this.innerColour[3] * fade})`);
        grad.addColorStop(1, `rgb(${this.outerColour[0]} ${this.outerColour[1]} ${this.outerColour[2]}/ ${this.outerColour[3] * fade})`);
        ctx.fillStyle = grad;
        ctx.fillRect(this.hitbox.x,this.hitbox.y,this.hitbox.width,this.hitbox.height);
    }
    update(dT)
    {
        if(this.isDead)
            return;
        super.update(dT);
        // currently inactive, was used to implement damage ticks
        // #TODO: actually implement damage ticks
        this.hitcd-=dT;
        if(this.hitcd<0)
            this.hitcd=0;
        // update fade timer
        this.fadetimer-=dT;
        // remove the beam once it is fully faded out
        if(this.fadetimer<=0)
        {
            this.isDead=true;
            return;
        }

    }
    /**
     * Runs when this beam collides with an entity
     * @param {Actor} other 
     */
    hit(other)
    {
        // damage the other thing
        // #TODO: add proper damage ticking as it currently applies damage every frame
        other.damage(this.damage);
    }
}
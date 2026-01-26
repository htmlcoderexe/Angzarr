/**
 * Represents an active entity on the playing field, such as the player or an enemy.
 */
class Actor extends GameObject
{
    /**
    Contains the data used to draw the object, such as curves and animations.
     */
    basicshape ={};
    /**
    Contains the VectorSprite used to represent the entity on the playing field.
     */
    animation = null;
    /**
    Entity's current hitpoints.
     */
    HP = 10;
    /**
    Entity's full hitpoints.
     */
    MaxHP = 10;
    /**
    List of abilities usable by the entity.
     */
    abilities = [];
    /**
     * Creates a new entity, given visual data and type, defaulting to "actor"
     * @param {Array} shape - the visual data, see other classes or VectorSprite class for information on how it should be structured.
     * @param {string} type - object type, defaults to "actor" 
     */
    constructor(shape, type="actor")
    {
        super(type);
        // needed to set the data
        this.basicshape = shape;
        // creates the VectorSprite to be rendered
        this.animation=VectorSprite.fromRawObject(this.basicshape);
    }
    /**
     * Updates the entity state
     * @param {number} dT - elapsed time
     */
    update(dT)
    {
        // update charges, cooldowns etc
        this.abilities.forEach((a)=>{
            a.update(dT);
        });
        // updates animation state; #TODO - make this less hardcoded
        if(this.animation)
            this.animation.animations['idle'].update(dT);
        if(this.HP<=0)
            this.die();
        super.update(dT);
    }
    /**
     * Draws the entity on a canvas context
     * @param {CanvasRenderingContext2D} ctx - the canvas context to use 
     */
    draw(ctx)
    {
        // ensure object gets cleanly translated
        ctx.resetTransform();
        ctx.translate(this.x,this.y);
        // draw the animation #TODO - make this less hardcoded
        this.animation.animations['idle'].draw(ctx);
        ctx.resetTransform();
    }
    /**
     * Applies damage to the entity
     * @param {number} amount - raw amount to apply
     * @param {any} type - damage type
     */
    damage(amount, type=0)
    {
        // currently just applies the damage as is
        this.HP-=amount;
        // kill the entity before next update does
        if(this.HP<=0)
        {
            this.die();
        }
        // apply a red flash effect
        this.animation.animations['idle'].applyFade("255 0 0",0.5);
    }
}
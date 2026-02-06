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
    Entity's current hitpoints.
     */
    HP = 10;
    /**
    Entity's full hitpoints.
     */
    MaxHP = 10;
    stats = new StatBlock();
    effects = [];
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
        // creates the VectorSprite to be rendered
        if(shape)
            this.sprite=VectorSprite.fromRawObject(shape);
        
    }
    refresh()
    {
        this.MaxHP=this.stats.calculateStat("HP");
        this.HP=this.MaxHP;
        this.abilities.forEach((a)=>{
            a.refresh();
        });
        console.log("refreshed", this);
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
        this.MaxHP=this.stats.calculateStat("HP");
        this.HP+=this.stats.calculateStat("HPRegen")*dT;
        this.HP=Math.min(this.MaxHP,this.HP);
        if(this.HP<=0)
            this.die();
        super.update(dT);
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
        this.sprite.applyFade("255 0 0",0.5);
    }
}
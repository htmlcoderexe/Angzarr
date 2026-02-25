/**
 * Represents an UI element to interact with an ability.
 */
class AbilitySlot extends UIElement
{
    /**
     * The assigned ability.
     */
    ability = null;
    static {
        UIElement.controlRegistry.skillslot=this;
    }
    /**
     * Creates the control given the hitbox and the ability to control
     * @param {Rectangle} rekt 
     * @param {Ability} ability 
     */
    constructor(rekt,ability)
    {
        super(rekt);
        this.ability=ability;
        this.addEventListener("click",(x,y)=>{this.ability.use();});
    }
    drawControl(ctx)
    {
        // draw a generic frame in the shape of the hitbox
        // so people know where to poke
        UIRenderer.drawFrame(ctx,0,0,this.hitbox.width,this.hitbox.height);
        // very null checking such advanced much programming wow 
        if(this.ability!=null)
        {
            // i should probably sacrifice some cattle to the UIRenderer
            // it's so awesome
            UIRenderer.drawGauge(ctx,
                10,10,24,this.hitbox.height-16,
                Math.floor(this.ability.charge),this.ability.maxcharge,
                "0 255 50");
        }
    }
}
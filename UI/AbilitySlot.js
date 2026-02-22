/**
 * Represents an UI element to interact with an ability.
 */
class AbilitySlot extends UIElement
{
    /**
     * The assigned ability.
     */
    ability = null;
    /**
     * Creates the control given the hitbox and the ability to control
     * @param {Rectangle} rekt 
     * @param {Ability} ability 
     */
    constructor(rekt,ability)
    {
        super(rekt);
        this.ability=ability;
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
    click(x,y)
    {
        // that's it!
        // the click will tell the ability that someone wants to use it
        // the ability might get used or might not
        // but either way we don't care
        // whatever happens to the ability will be easily seen when the control gets drawn
        this.ability.use();
    }
}
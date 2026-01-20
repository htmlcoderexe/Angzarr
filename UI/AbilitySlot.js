class AbilitySlot extends UIElement
{
    ability = null;
    constructor(rekt,ability)
    {
        super(rekt);
        this.ability=ability;
    }
    draw(ctx)
    {
        super.draw(ctx);
        UIRenderer.drawFrame(ctx,this.hitbox.x, this.hitbox.y,this.hitbox.width,this.hitbox.height);
        if(this.ability!=null)
        {
            UIRenderer.drawGauge(ctx,
                this.hitbox.x+6,this.hitbox.y+6,24,this.hitbox.height-8,
                Math.floor(this.ability.charge),this.ability.maxcharge,
                "0 255 50");
        }
    }
    click()
    {
        this.ability.use();
    }
}
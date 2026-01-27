/**
 * Represents a clickable button
 */
class UIButton extends UIElement
{
    /**
     * Button text
     */
    text ="";
    // #TODO: fuck this
    bgcolor="#FF9000";
    constructor(rekt, text)
    {
        super(rekt);
        this.text = text;
    }
    draw(ctx)
    {
        super.draw(ctx);
        UIRenderer.drawButton(ctx,
            this.hitbox.x,
            this.hitbox.y,
            this.hitbox.width,
            this.hitbox.height,
            this.text);
    }
}
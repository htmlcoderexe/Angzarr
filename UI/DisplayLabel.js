/**
 * Represents a label with text on it
 */
class DisplayLabel extends UIElement
{
    /**
     * Label text
     */
    text = "";
    /**
     * Creates a new label given rectangle and some text
     * @param {Rectangle} rekt 
     * @param {string} text 
     */
    constructor(rekt,text)
    {
        super(rekt);
        this.text=text;
    }
    draw(ctx)
    {
        super.draw(ctx);
        // very convenient yes
        UIRenderer.drawScreenBox(ctx,this.hitbox.x, this.hitbox.y,this.hitbox.width,this.hitbox.height, this.text);
    }
    click()
    {
        
    }
}
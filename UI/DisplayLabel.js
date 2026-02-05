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
     * Label colour, in "R G B" decimal
     */
    colour = "0 192 16";
    /**
     * Creates a new label given rectangle and some text
     * @param {Rectangle} rekt 
     * @param {string} text 
     */
    constructor(rekt,text,colour="")
    {
        super(rekt);
        if(colour!="")
            this.colour=colour;
        this.text=text;
    }
    draw(ctx)
    {
        super.draw(ctx);
        // very convenient yes
        UIRenderer.drawScreenBox(ctx,this.hitbox.x, this.hitbox.y,this.hitbox.width,this.hitbox.height, this.text,this.colour);
    }
}
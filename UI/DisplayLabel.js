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
    static {
        UIElement.controlRegistry.label=this;
    }
    constructor(rekt,text,colour="")
    {
        super(rekt);
        if(colour!="")
            this.colour=colour;
        this.text=text;
    }
    drawControl(ctx)
    {
        // very convenient yes
        UIRenderer.drawScreenBox(ctx,0,0,this.hitbox.width,this.hitbox.height, this.text,this.colour);
    }
}
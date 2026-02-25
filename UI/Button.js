/**
 * Represents a clickable button
 */
class UIButton extends UIElement
{
    static colourSchemes = {
        "green":["20 130 20", "120 255 120", "0 40 0"],
        "grey":["100 100 100","200 200 200","30 30 30"]
    };
    /**
     * Button text
     */
    text ="";
    // #TODO: fuck this
    bgcolor="#FF9000";
    colourScheme = "";
    static {
        UIElement.controlRegistry.button=this;
    }
    constructor(rekt, text, colour="")
    {
        super(rekt);
        this.text = text;
        this.colourScheme=colour;
    }
    drawControl(ctx)
    {
        let scheme = null;
        if(this.colourScheme!="" && UIButton.colourSchemes[this.colourScheme])
        {
            scheme = UIButton.colourSchemes[this.colourScheme];
        }
        UIRenderer.drawButton(ctx,
            0,0,this.hitbox.width,this.hitbox.height,
            this.text,
            scheme);
    }
}
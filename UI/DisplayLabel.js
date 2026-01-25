class DisplayLabel extends UIElement
{
    text = "";
    constructor(rekt,text)
    {
        super(rekt);
        this.text=text;
    }
    draw(ctx)
    {
        super.draw(ctx);
        UIRenderer.drawScreenBox(ctx,this.hitbox.x, this.hitbox.y,this.hitbox.width,this.hitbox.height, this.text);
    }
    click()
    {
        
    }
}
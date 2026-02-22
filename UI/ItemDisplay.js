class ItemDisplay extends UIElement
{
    #_item = null;
    get item() 
    {
        return this.#_item;
    }
    set item(value)
    {
        if(value && value.inventorySprite)
        {
            value.inventorySprite.play("inventory");
        }
        this.#_item = value;
    }
    constructor(item,x,y)
    {
        super([x,y,64,64]);
        this.item = item;
    }
    draw(ctx)
    {
        UIRenderer.drawFrame(ctx, ...this.hitbox);
        ctx.translate(this.hitbox.x,this.hitbox.y);
        if(this.item)
        {
            if(this.item.count>1)
            {
                // font, #TODO: replace with something cooler, Geo font looks nice
                ctx.font = "bold 16px sans-serif";
                // braindead centering logic at 3AM
                //ctx.textAlign="center";
                ctx.textBaseline="bottom";
                // draw the shit
                ctx.lineWidth = 1;
                ctx.strokeStyle="#000000";
                ctx.fillStyle="#FFFFFF";
                ctx.fillText(this.item.count,12,64-3);
                ctx.strokeText(this.item.count,12,64-3);
            }
            ctx.translate(32,32);
            this.item.inventorySprite.draw(ctx);
        }
        ctx.resetTransform();
        super.draw(ctx);
    }
    update(dt)
    {
        if(this.item && this.item.inventorySprite)
        {
            this.item.inventorySprite.update(dt);
        }
    }
}
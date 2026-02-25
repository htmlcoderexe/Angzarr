class ItemDisplay extends UIElement
{
    #_item = null;
    inventoryIndex =0;
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
    static {
        UIElement.controlRegistry.itemslot=this;
    }
    constructor(rekt,item=undefined)
    {
        super([rekt[0],rekt[1],64,64]);
        this.item = item;
        this.addEventListener("click",(x,y)=>
        {
            this.parent.selectedIndex = this.inventoryIndex;
            console.log(x,y,this.parent,this.inventoryIndex);
            return true;
        });
    }
    drawControl(ctx)
    {
        UIRenderer.drawFrame(ctx, 0,0,this.hitbox.width,this.hitbox.height);
        if(this.item)
        {
            if(this.item.count>1)
            {
                // font, #TODO: replace with something cooler, Geo font looks nice
                ctx.font = "bold 16px roboto";
                // braindead centering logic at 3AM
                //ctx.textAlign="center";
                ctx.textBaseline="bottom";
                // draw the shit
                ctx.lineWidth = 2;
                ctx.strokeStyle="#000000";
                ctx.fillStyle="#FFFFFF";
                ctx.strokeText(this.item.count,12,64-3);
                ctx.fillText(this.item.count,12,64-3);
            }
            if(this.item.inventorySprite)
            {
                ctx.translate(32,32);
                this.item.inventorySprite.draw(ctx);
                ctx.translate(-32,-32);
            }
        }
    }
    update(dt)
    {
        if(this.item && this.item.inventorySprite)
        {
            this.item.inventorySprite.update(dt);
        }
    }
}
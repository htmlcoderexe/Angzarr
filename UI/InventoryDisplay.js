class InventoryDisplay extends UIElement
{
    inventory = null;
    constructor(inventory, x, y,columns)
    {
        let padding = 5;
        let iwidth = 64+6;
        let width = columns*(padding+iwidth)+padding;
        let rows = Math.ceil(inventory.capacity/columns);
        let height = rows*(padding+iwidth)+padding;
        super([x,y,width,height]);
        this.inventory=inventory;
        for(let row = 0;row<rows;row++)
            for(let col =0;col<columns;col++)
            {
                let offset = row*columns+col;
                if(offset>inventory.capacity)
                    continue;
                let ii = new ItemDisplay(inventory.items[offset],col*(padding+iwidth)+padding,row*(padding+iwidth)+padding);
                this.add(ii);
            }
    }
    draw(ctx)
    {
        UIRenderer.drawFrame(ctx,...this.hitbox);
        super.draw(ctx);
    }
}
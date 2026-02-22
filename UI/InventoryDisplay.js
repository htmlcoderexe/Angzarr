class InventoryDisplay extends UIElement
{
    inventory = null;
    #selected =-1;
    get selectedIndex()
    {
        return this.#selected;
    }
    set selectedIndex(value)
    {
        if(value!=this.#selected)
        {
            this.#selected=value;
            this.selectHandler?.(value);
        }
    }
    constructor(x, y,inventory, columns)
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
                ii.inventoryIndex = offset;
                this.add(ii);
            }
    }
    drawControl(ctx)
    {
        UIRenderer.drawFrame(ctx,0,0,this.hitbox.width,this.hitbox.height);
    }
    addEventListener(event, handler)
    {
        if(super.addEventListener(event,handler))
            return true;
        switch(event)
        {
            case "select":
            {
                this.selectHandler=handler;
                return true;
            }
        }
        return false;
    }
}
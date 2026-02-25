class InventoryDisplay extends UIElement
{
    inventory = null;
    #selected =-1;
    get selectedItem()
    {
        if(this.#selected==-1)
            return undefined;
        return this.inventory.items[this.#selected];
    }
    get selectedIndex()
    {
        return this.#selected;
    }
    set selectedIndex(value)
    {
        if(value!=this.#selected)
        {
            this.#selected=value;
            this.raiseEvent("select",value);
        }
    }
    static {
        UIElement.controlRegistry.inventory=this;
    }
    constructor(rekt,inventory, columns)
    {
        console.log(...arguments);
        let padding = 5;
        let iwidth = 64+6;
        let width = columns*(padding+iwidth)+padding;
        let rows = Math.ceil(inventory.capacity/columns);
        let height = rows*(padding+iwidth)+padding;
        super([rekt.x,rekt.y,width,height]);
        this.inventory=inventory;
        for(let row = 0;row<rows;row++)
            for(let col =0;col<columns;col++)
            {
                let offset = row*columns+col;
                if(offset>inventory.capacity)
                    continue;
                let ii = new ItemDisplay([col*(padding+iwidth)+padding,row*(padding+iwidth)+padding,1,1],inventory.items[offset]);
                ii.inventoryIndex = offset;
                this.add(ii);
            }
    }
    drawControl(ctx)
    {
        UIRenderer.drawFrame(ctx,0,0,this.hitbox.width,this.hitbox.height);
    }
}
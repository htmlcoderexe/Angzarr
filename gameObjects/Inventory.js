class Inventory 
{
    items = [];
    overflow = [];
    capacity = 1;
    constructor(size)
    {
        this.capacity=size;
        this.items = new Array(size);
    }
    checkFit(item)
    {

    }
    add(item, overflow=false)
    {
        // for now
        this.items.push(item);
    }
    remove(item, quantity=0)
    {

    }
    *[Symbol.iterator]() {
        for(const item of this.items)
        {
            yield item;
        }
    }
}
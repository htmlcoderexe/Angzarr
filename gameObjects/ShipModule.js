class ShipModule extends InventoryItem
{
    stateffects = [];
    abilities = [];
    owner = null;
    add(target)
    {
        this.owner=target;
        this.stateffects.forEach((e)=>{
            this.owner.stats.add(e);
        });
    }
    remove()
    {
        if(this.owner)
        {
            this.stateffects.forEach((e)=>{
                this.owner.stats.remove(e);
            });
        }
        this.owner=null;
    }
}
class Effect
{
    ttl=0;
    stateffects=[];
    apply(target)
    {
        this.stateffects.forEach((e)=>{
            target.statblock.add(e);
        });
    }
    remove(target)
    {
        this.stateffects.forEach((e)=>{
            target.statblock.remove(e);
        });
    }
}
class Effect
{
    ttl=0;
    expired = false;
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
    update(dT)
    {
        this.ttl-=dT;
        if(this.ttl<=0)
        {
            this.expired=true;
        }
    }
}
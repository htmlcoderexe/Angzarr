class StageMap
{
    objects = [];
    constructor(map)
    {
        if(!map || map.length<1)
            return;
        map.forEach((e)=>{
            this.objects.push(...e);
            });
        this.objects.sort((a,b)=>a.offset-b.offset);
    }
    add(map,offset)
    {
        map.forEach((e)=>{
            let e2 = {...e};
            e2.offset+=offset;
            this.objects.push({...e2});
            });
        this.objects.sort((a,b)=>a.offset-b.offset);
    }
    *[Symbol.iterator]() {
        for(let i=0;i<this.objects.length;i++)
        {    
            yield this.objects[i];
        }
    }
}
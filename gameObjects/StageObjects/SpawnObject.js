class SpawnObject extends StageObject
{
    spawn;
    constructor(offset, stageObject)
    {
        super(offset,"spawn");
        this.spawn = stageObject;
    }
    trigger(scene, diff)
    {
        super.trigger(scene,diff);
        // offset the object exactly
        this.spawn.y+=diff;
        this.spawn.onDeath=()=>{
                let dtable = HostileData.dropTables[this.spawn.dropTable];
                if(dtable)
                {
                    let drops = Hostile.doDrops(dtable);
                    for(let i=0;i<drops.length;i++)
                    {
                        let ptpl = PickupData.pickups[drops[i]];
                        if(ptpl)
                        {
                            let p = Pickup.fromTemplate(ptpl)
                            p.x=this.spawn.x;
                            p.y=this.spawn.y;
                            scene.addObject(p);
                        }
                    }
                }
        };
        scene.addObject(this.spawn);
    }
}
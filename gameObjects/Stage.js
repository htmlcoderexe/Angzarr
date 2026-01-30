/**
 * Represents a stage that the player progresses through, 
 * containing various objects and events triggering once reached.
 */
class Stage
{
    /**
     * Holds a reference to the scene where the stage is deployed.
     */
    scene = null;
    objects = [];
    duration = 0;
    progress = 0;
    finished = false;
    constructor(scene, objects)
    {
        objects.sort((a,b)=>a.offset-b.offset);
        this.duration = objects[objects.length-1].offset;
        this.objects=objects;
        this.scene = scene;
    }
    update(dT)
    {
        if(this.finished)
            return;
        this.progress+=STAGE_DEFAULT_SPEED * this.scene.speedMultiplier * dT;
        if(this.progress>=this.duration)
        {
            this.progress=this.duration;
            this.finished=true;
            console.log("done!!11");
        }
        for(let i=0;i<this.objects.length;i++)
        {
            if(this.objects[i].triggered)
                continue;
            if(this.objects[i].offset>this.progress)
                break;
            this.objects[i].trigger(this.scene,this.progress-this.objects[i].offset);
        }
    }
    static load(map)
    {
        let result = [];
        map.forEach((item)=>{
            // for testing!
            let x = item.x;
            let y = item.y;
            let o = item.offset;
            let testmob = Hostile.fromTemplate(HostileData.hostiles[item.type]);
            testmob.x=x;
            testmob.y=y;
            let so = new SpawnObject(o,testmob);
            result.push(so);
        });
        return result;
    }
}
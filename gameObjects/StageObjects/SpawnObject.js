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
            
                for(let i=0;i<Math.random()*4;i++)
                {
                    let p = new Pickup();
                    p.x=this.spawn.x;
                    p.y=this.spawn.y;
                    p.movementVector.y=-5;
                    p.movementVector.x=-2+Math.random()*4;
                    scene.addObject(p);
                }
        };
        scene.addObject(this.spawn);
    }
}
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
        scene.addObject(this.spawn);
    }
}
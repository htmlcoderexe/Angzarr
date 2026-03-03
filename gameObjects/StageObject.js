/**
 * Defines an object located on the stage.
 */
class StageObject
{
    /**
     * Defines how far in the stage this object is.
     */
    offset = 0;
    /**
     * Indicates the type of this StageObject.
     */
    type;
    /**
     * Keeps track of whether the object has already been triggered.
     */
     x;
     y;
    triggered = false;
    static objectRegistry = {};
    static register(cls, name)
    {
        StageObject.objectRegistry[name]=cls;
    }
    static load(obj)
    {
        let cls = StageObject.objectRegistry[obj.type];
        if(cls)
            return new cls(obj);
    }
    constructor(obj)
    {
        this.offset=obj.offset;
        this.type=obj.type;
        this.x=obj.x;
        this.y=obj.y;
    }
    /**
     * Performs the action associated with triggering this object.
     * @param {GameScene} scene - scene to trigger in
     * @param {number} diff - actual offset onscreen 
     */
    trigger(scene, diff)
    {
        this.triggered=true;
    }
}
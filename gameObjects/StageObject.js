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
    triggered = false;
    constructor(offset, type="stageobject")
    {
        this.offset=offset;
        this.type=type;
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
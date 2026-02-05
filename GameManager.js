/**
 * Manages the overall game state, input, rendering, updates, scenes.
 */
class GameManager
{
    /**
    Current game scene
     */
    currentScene = null;
    /**
    Rendering context
     */
    ctx = null;
    /**
    Keeps track of the previous update timestamp.
     */
    prevTime = null;
    /**
    
     */
    debug = false;
    /**
     * Updates the game state and requests next update.
     * @param {number} timestamp - The timestamp given by the frame, used for calculating elapsed time.
     */
    update(timestamp)
    {
        // if this is the first run, use current timestamp, resulting in a 0 step
        if(this.prevTime===null)
        {
            this.prevTime = timestamp;
        }
        // calculate elapsed time
        const dT = timestamp-this.prevTime;
        // render and update current scene if one exists and can be rendered
        if(this.currentScene && this.ctx)
        {
            // the timestamps are in milliseconds, convert to floating point seconds
            this.currentScene.update(dT/1000);
            this.currentScene.draw(this.ctx);
        }
        // save the timestamp to calculate elapsed time next round
        this.prevTime = timestamp;
        // ensures rendering matches refresh rate
        requestAnimationFrame((t)=>this.update(t));
    }
    /**
     * Handles pointer (touch, mouse) movement
     * @param {PointerEvent} e - the event from DOM
     */
    handlePointerMove(e)
    {
        // this distinguishes second (and so on) touch on touch devices
        if(e.isPrimary)
        {
            this.currentScene.handlePrimaryPointerMove(e);
        }
        else
        {
            this.currentScene.handleSecondaryPointerMove(e);
        }
        e.preventDefault();
    }
    /**
     * Handles mouse button release / finger release
     * @param {PointerEvent} e - the event from DOM
     */
    handlePointerUp(e)
    {
        // this distinguishes second (and so on) touch on touch devices
        if(e.isPrimary)
        {
            this.currentScene.handlePrimaryPointerUp(e);
        }
        else
        {
            this.currentScene.handleSecondaryPointerUp(e);
        }
        e.preventDefault();

    }
    /**
     * Handles mouse button down and touch start
     * @param {PointerEvent} e - the event from DOM
     */
    handlePointerDown(e)
    {

    }
    /**
     * Handles mouse button click and touch "click"
     * @param {PointerEvent} e - the event from DOM
     */
    handlePointerClick(e)
    {
        // this distinguishes second (and so on) touch on touch devices
        if(e.isPrimary)
        {
            this.currentScene.handlePrimaryPointerClick(e);
        }
        else
        {
            this.currentScene.handleSecondaryPointerClick(e);
        }
        e.preventDefault();

    }
    /**
     * Handles key down from the keyboard
     * @param {PointerEvent} e - the event from DOM
     */
    handleKeyDown(e)
    {
        console.log("gamemanager keydown");
        this.currentScene.handleKeyDown(e);
        e.preventDefault();
    }
    /**
     * Handles key up from the keyboard
     * @param {PointerEvent} e - the event from DOM
     */
    handleKeyUp(e)
    {
        this.currentScene.handleKeyUp(e);
        e.preventDefault();

    }
    /**
     * Handles key press from the keyboard
     * @param {PointerEvent} e - the event from DOM
     */
    handleKeyPress(e)
    {
        this.currentScene.handleKeyPress(e);
        e.preventDefault();

    }
}
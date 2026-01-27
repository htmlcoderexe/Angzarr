/**
 * Base class for any game "activity" or "screen" that gets updated and drawn 
 */
class GameScene
{
    /**
     * References the active player
     */
    player = null;
    /**
     * Length of the long side of the game screen
     */
    longSide =0;
    /**
     * Length of the short side of the game screen
     */
    shortSide = 0;
    /**
     * Initialises the scene.
     */
    /**
    * Contains the scene's objects.
    */
    gameObjects = [];
    /**
     * Adds an object to the scene
     * @param {GameObject} obj 
     */
    addObject(obj)
    { 
        this.gameObjects.push(obj);
        //console.log(this.gameObjects.length);
        obj.scene = this;
        //console.log(obj,this);
    }
    constructor()
    {
        // this currently defaults to portrait orientation
        // #TODO: make this actually use and adapt to landscape
        // sideways scrolling?
        this.shortSide= window.innerWidth;
        this.longSide=window.innerHeight;
    }
    /**
     * Updates the scene.
     * @param {number} dT - elapsed time 
     */
    update(dT)
    {
        
    }
    /**
     * Draws the scene.
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx)
    {

    }
    /**
     * Handles primary pointer movement.
     * @param {PointerEvent} e - event from DOM 
     */
    handlePrimaryPointerMove(e)
    {

    }
    /**
     * Handles secondary pointer movement.
     * @param {PointerEvent} e - event from DOM 
     */
    handleSecondaryPointerMove(e)
    {

    }
    /**
     * Handles primary pointer release.
     * @param {PointerEvent} e - event from DOM 
     */
    handlePrimaryPointerUp(e)
    {

    }
    /**
     * Handles secondary pointer release.
     * @param {PointerEvent} e - event from DOM 
     */
    handleSecondaryPointerUp(e)
    {

    }
    /**
     * Handles primary pointer press.
     * @param {PointerEvent} e - event from DOM 
     */
    handlePrimaryPointerDown(e)
    {

    }
    /**
     * Handles secondary pointer press.
     * @param {PointerEvent} e - event from DOM 
     */
    handleSecondaryPointerDown(e)
    {

    }
    /**
     * Handles primary pointer click.
     * @param {PointerEvent} e - event from DOM 
     */
    handlePrimaryPointerClick(e)
    {

    }
    /**
     * Handles secondary pointer click.
     * @param {PointerEvent} e - event from DOM 
     */
    handleSecondaryPointerClick(e)
    {

    }
    
    /**
     * Handles keydown event.
     * @param {PointerEvent} e - event from DOM 
     */
    handleKeyDown(e)
    {

    }
    /**
     * Handles keyup event.
     * @param {PointerEvent} e - event from DOM 
     */
    handleKeyUp(e)
    {

    }
    /**
     * Handles keypress event.
     * @param {PointerEvent} e - event from DOM 
     */
    handleKeyPress(e)
    {

    }
}
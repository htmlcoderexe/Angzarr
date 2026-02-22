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
     * Indicates whether the scene is paused.
     */
    paused = false;
    visible = true;
    uimgr = null;
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
    /**
     * Initialises the scene.
     */
    constructor()
    {
        // this currently defaults to portrait orientation
        // #TODO: make this actually use and adapt to landscape
        // sideways scrolling?
        this.shortSide= window.innerWidth;
        this.longSide=window.innerHeight;
        this.uimgr=new GUIManager(this.shortSide,this.longSide);
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
    handlePrimaryPointerMove(x,y)
    {

    }
    /**
     * Handles secondary pointer movement.
     * @param {PointerEvent} e - event from DOM 
     */
    handleSecondaryPointerMove(x,y)
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
    click(x,y){}
    /**
     * Handles primary pointer click.
     * @param {PointerEvent} e - event from DOM 
     */
    handlePrimaryPointerClick(x,y)
    {
        this.click?.(x,y);

    }
    clickSecondary(x,y){}
    /**
     * Handles secondary pointer click.
     * @param {PointerEvent} e - event from DOM 
     */
    handleSecondaryPointerClick(x,y)
    {
        let handled = this.uimgr.handleClick(x,y);
        if(handled)
            return;
        this.clickSecondary?.(x,y);
    }
    keyDown(key){}
    /**
     * Handles keydown event.
     * @param {PointerEvent} e - event from DOM 
     */
    handleKeyDown(e)
    {
        this.keyDown?.(e.key);
    }
    keyUp(key) {}
    /**
     * Handles keyup event.
     * @param {PointerEvent} e - event from DOM 
     */
    handleKeyUp(e)
    {
        this.keyUp?.(e.key);
    }
    keyPress(key) {}
    /**
     * Handles keypress event.
     * @param {PointerEvent} e - event from DOM 
     */
    handleKeyPress(e)
    {
        this.keyPress?.(e.key);
    }
}
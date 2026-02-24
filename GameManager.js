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
    pointer1Down = false;
    pointer2Down = false;
    prevPointer1 = [0,0];
    prevPointer2 = [0,0];
    downPointer1 = [0,0];
    downPointer1 = [0,0];
    p1control = null;
    p2control = null;
    scaleFactor=1;
    /**
     * Length of the long side of the game screen
     */
    longSide =0;
    /**
     * Length of the short side of the game screen
     */
    shortSide = 0;
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
            this.ctx.resetTransform();
            this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
            this.ctx.scale(1/this.scaleFactor,1/this.scaleFactor);
            this.currentScene.draw(this.ctx);
        }
        // save the timestamp to calculate elapsed time next round
        this.prevTime = timestamp;
        // ensures rendering matches refresh rate
        requestAnimationFrame((t)=>this.update(t));
    }
    sizeText(text, font)
    {
        if(!this.ctx)
            return [1,1];
        this.ctx.font = font;
        let metrics = this.ctx.measureText(text);
        let strw = metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft;
        let strh = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
        return [strw,strh];
    }
    /**
     * Handles pointer (touch, mouse) movement
     * @param {PointerEvent} e - the event from DOM
     */
    handlePointerMove(e)
    {
        let ex=e.offsetX*this.scaleFactor;
        let ey=e.offsetY*this.scaleFactor;
        // this distinguishes second (and so on) touch on touch devices
        if(e.isPrimary)
        {
            // generate the swipe event from current position
            // and the previous position of this pointer 
            let x = ex;
            let ox =this.prevPointer1[0];
            let dx=x-ox;
            let y = ey;
            let oy=this.prevPointer1[1];
            let dy=y-oy;
            // only actually trigger the swipe if pointer currently down
            if(this.pointer1Down)
                this.currentScene.uimgr.handleSwipe(ox,oy,dx,dy);
            // store this position for next time
            this.prevPointer1=[x,y];
            this.currentScene.handlePrimaryPointerMove(x,y);
        }
        // same but for secondary pointer
        // that's how you get multitouch well "dual" touch or whatever
        else
        {
            let x = ex;
            let ox =this.prevPointer2[0];
            let dx=x-ox;
            let y = ey;
            let oy=this.prevPointer2[1];
            let dy=y-oy;
            if(this.pointer2Down)
                this.currentScene.uimgr.handleSwipe(ox,oy,dx,dy);
            this.prevPointer2=[x,y];
            this.currentScene.handleSecondaryPointerMove(x,y);
        }
        e.preventDefault();
    }
    /**
     * Handles mouse button release / finger release
     * @param {PointerEvent} e - the event from DOM
     */
    handlePointerUp(e)
    {
        let ex=e.offsetX*this.scaleFactor;
        let ey=e.offsetY*this.scaleFactor;
        // this distinguishes second (and so on) touch on touch devices
        if(e.isPrimary)
        {
            // drop the pointer down state
            this.pointer1Down=false;
            // generate the drag event from current position
            // and the position this pointer went down on
            let x = ex;
            let ox =this.downPointer1[0];
            let dx=x-ox;
            let y = ey;
            let oy=this.downPointer1[1];
            let dy=y-oy;
            let handled = false;
            // see if anything handles the drag event this generates
            if(dx!=0 || dy!=0)
            {
                handled = this.currentScene.uimgr.handleDrag(ox,oy,dx,dy);
            }
            if(handled)
            {
                this.p1control=null;
                e.preventDefault();
                return;
            }
            // check if the control the pointer went up on is the same
            // the pointer previously went down on
            // if yes, generate a click for the UI manager
            let eup= this.currentScene.uimgr.pickElementSpecific(ex,ey);
            console.warn(this.p1control, eup);
            if(eup==this.p1control)
            {
                handled = this.currentScene.uimgr.handleClick(x,y);
                if(handled)
                {
                this.p1control=null;
                    e.preventDefault();
                    return;
                }
            }
            this.p1control=null;
            // if still here, pass the pointerup to the scene
            this.currentScene.handlePrimaryPointerUp(e);
        }
        // same stuff for secondary
        else
        {
            this.pointer2Down=false;
            let x = ex;
            let ox =this.downPointer2[0];
            let dx=x-ox;
            let y = ey;
            let oy=this.downPointer2[1];
            let dy=y-oy;
            let handled = false;
            if(dx!=0 || dy!=0)
            {
                handled = this.currentScene.uimgr.handleDrag(ox,oy,dx,dy);
            }
            if(handled)
            {
                this.p2control=null;
                e.preventDefault();
                return;
            }
            let eup= this.currentScene.uimgr.pickElementSpecific(ex,ey);
            if(eup==this.p2control)
            {
                handled = this.currentScene.uimgr.handleClick(x,y);
                if(handled)
                {
                    this.p2control=null;
                    e.preventDefault();
                    return;
                }

            }
            this.p2control=null;
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
        let ex=e.offsetX*this.scaleFactor;
        let ey=e.offsetY*this.scaleFactor;
        // this distinguishes second (and so on) touch on touch devices
        // basically it records the UI control the pointer went down on, if any
        // this will be checked in the corresponding pointerUp handler to generate
        // the click event for the UI
        if(e.isPrimary)
        {
            // also set the pointer down state
            this.pointer1Down=true;
            // and the location where the pointer went down
            this.downPointer1=[ex,ey];
            this.p1control=this.currentScene.uimgr.pickElementSpecific(ex,ey);
            // yeah in theory should be some possibility for UI to intercept down event
            // but that's too hairy for now and most of the time
            // the artificial swipe event does whatever was needed anyway
            this.currentScene.handlePrimaryPointerDown(e);
        }
        else
        {
            this.pointer2Down=true;
            this.downPointer2=[ex,ey];
            this.p2control=this.currentScene.uimgr.pickElementSpecific(ex,ey);
            this.currentScene.handleSecondaryPointerDown(e);
        }
        e.preventDefault();

    }
    /**
     * Handles mouse button click and touch "click"
     * @param {PointerEvent} e - the event from DOM
     */
    handlePointerClick(e)
    {
        let ex=e.offsetX*this.scaleFactor;
        let ey=e.offsetY*this.scaleFactor;
        // fuck this, we get twice the clicks because of the pointerup event
        // so UI clicks happen in the PointerUp event
        // this will just pass the click event to the rest of the scene
        // this distinguishes second (and so on) touch on touch devices
        if(e.isPrimary)
        {
            this.currentScene.handlePrimaryPointerClick(ex,ey);
        }
        else
        {
            this.currentScene.handleSecondaryPointerClick(ex,ey);
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
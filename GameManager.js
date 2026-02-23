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
        // this distinguishes second (and so on) touch on touch devices
        if(e.isPrimary)
        {
            let x = e.offsetX;
            let ox =this.prevPointer1[0];
            let dx=x-ox;
            let y = e.offsetY;
            let oy=this.prevPointer1[1];
            let dy=y-oy;
            if(this.pointer1Down)
                this.currentScene.uimgr.handleSwipe(ox,oy,dx,dy);
            this.prevPointer1=[x,y];
            this.currentScene.handlePrimaryPointerMove(x,y);
        }
        else
        {
            let x = e.offsetX;
            let ox =this.prevPointer2[0];
            let dx=x-ox;
            let y = e.offsetY;
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
        // this distinguishes second (and so on) touch on touch devices
        if(e.isPrimary)
        {
            this.pointer1Down=false;
            let x = e.offsetX;
            let ox =this.downPointer1[0];
            let dx=x-ox;
            let y = e.offsetY;
            let oy=this.downPointer1[1];
            let dy=y-oy;
            let handled = false;
            if(dx!=0 || dy!=0)
            {
                handled = this.currentScene.uimgr.handleDrag(ox,oy,dx,dy);
            }
            if(handled)
            {
                e.preventDefault();
                return;
            }
            let eup= this.currentScene.uimgr.pickElement(e.offsetX,e.offsetY);
            if(eup==this.p1control)
            {
                handled = this.currentScene.uimgr.handleClick(x,y);
                if(handled)
                {
                    e.preventDefault();
                    return;
                }
            }
            this.currentScene.handlePrimaryPointerUp(e);
        }
        else
        {
            this.pointer2Down=false;
            let x = e.offsetX;
            let ox =this.downPointer2[0];
            let dx=x-ox;
            let y = e.offsetY;
            let oy=this.downPointer2[1];
            let dy=y-oy;
            let handled = false;
            if(dx!=0 || dy!=0)
            {
                handled = this.currentScene.uimgr.handleDrag(ox,oy,dx,dy);
            }
            if(handled)
            {
                e.preventDefault();
                return;
            }
            let eup= this.currentScene.uimgr.pickElement(e.offsetX,e.offsetY);
            if(eup==this.p2control)
            {
                handled = this.currentScene.uimgr.handleClick(x,y);
                if(handled)
                {
                    e.preventDefault();
                    return;
                }

            }
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
        // this distinguishes second (and so on) touch on touch devices
        if(e.isPrimary)
        {
            this.pointer1Down=true;
            this.downPointer1=[e.offsetX,e.offsetY];
            this.p1control=this.currentScene.uimgr.pickElement(e.offsetX,e.offsetY);
            this.currentScene.handlePrimaryPointerDown(e);
        }
        else
        {
            this.pointer2Down=true;
            this.downPointer2=[e.offsetX,e.offsetY];
            this.p2control=this.currentScene.uimgr.pickElement(e.offsetX,e.offsetY);
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
        // this distinguishes second (and so on) touch on touch devices
        if(e.isPrimary)
        {
            this.currentScene.handlePrimaryPointerClick(e.offsetX,e.offsetY);
            let eup= this.currentScene.uimgr.pickElement(e.offsetX,e.offsetY);
            if(eup!=this.p1control)
            {
                e.preventDefault();
                return;
            }
            let handled = this.currentScene.uimgr.handleClick(e.offsetX,e.offsetY);
            if(handled)
            {
                e.preventDefault();
                return;
            }
        }
        else
        {
            this.currentScene.handleSecondaryPointerClick(e.offsetX,e.offsetY);
            let eup= this.currentScene.uimgr.pickElement(e.offsetX,e.offsetY);
            if(eup!=this.p2control)
            {
                e.preventDefault();
                return;
            }
            let handled = this.currentScene.uimgr.handleClick(e.offsetX,e.offsetY);
            if(handled)
            {
                e.preventDefault();
                return;
            }
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
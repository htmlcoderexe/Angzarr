/**
 * Manages the UI state, input, rendering
 */
class GUIManager
{
    /**
     * Contains UI elements that are on the screen
     */
    components = [];
    /**
     * Layer new components will be added to.
     */
    activeLayer = "system";
    /**
     * Adds an UI Element to the screen
     * @param {UIElement} component 
     * @param {string} layer 
     */
    add(component, layer="")
    {
        if(layer=="")
            layer = this.activeLayer;
        component.layer=layer;
        this.components.push(component);
    }
    remove(component)
    {
        this.components=this.components.filter((c)=>c!=component);
    }
    /**
     * Updates the state 
     * @param {number} dT 
     */
    update(dT)
    {

    }
    /**
     * Draws UI elements on the screen
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx, layer="")
    {
        // just draw every component
        if(layer=="")
        {
            this.components.forEach((c)=>{
                c.draw(ctx);
            });
        }
        else
        {
            let selection = this.components.filter((e)=>e.layer==layer);
            selection.forEach((c)=>{
                c.draw(ctx);
            });
        }
    }
    handlePrimaryPointerMove(e)
    {

    }
    handleSecondaryPointerMove(e)
    {

    }
    handlePrimaryPointerUp(e)
    {

    }
    handleSecondaryPointerUp(e)
    {

    }
    handlePrimaryPointerDown(e)
    {

    }
    handleSecondaryPointerDown(e)
    {

    }
    handlePrimaryPointerClick(e)
    {

    }
    /**
     * Handles a "click" and returns a value indicating whether any UI element received and handled the click
     * @param {PointerEvent} e 
     * @returns true if a UI element received the click, false otherwise
     */
    handleClick(e)
    {
        let handled = false;
        // check all UI elements 
        this.components.forEach((c)=>{
            const target = c.checkhit(e.offsetX,e.offsetY);
            // if an element is found, click it and set the flag
            if(target)
            {
                target.click();
                handled = true;
            }
        });
        return handled;
    }
    handleKeyDown(e)
    {

    }
    handleKeyUp(e)
    {

    }
    handleKeyPress(e)
    {

    }
}
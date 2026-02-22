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
    screenW=1;
    screenH=1;
    currentMessage="";
    messageTimer = 0;
    messageColour="#000000";
    messageBlink=0;
    messageBlinkTimer=0;
    messageOn=false;
    contextParams = [];
    w=1;
    h=1;
    hitbox = new Rectangle(0,0,1,1);
    constructor(w,h)
    {
        this.w=w;
        this.h=h;
        this.hitbox=new Rectangle(0,0,w,h);
        console.log(w,h,this.w,this.h);
        window.$id=(id)=>{
            
            console.error(id);
            return this.find(id);
        };
        window.$destroy=(id)=>this.remove(id);
        window.$param=(param)=>{
            return this.contextParams[param];
        };
    }
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
        component.parent = this;
        this.components.push(component);
    }
    remove(component)
    {
        this.components=this.components.filter((c)=>c!=component);
    }
    find(id)
    {
        let result = null;
        this.components.forEach((c)=>{
            console.log("checking "+id);
            console.log(c);
            let result2 = c.find(id);
            if(result2)
                result = result2;
        });
        return result;
    }
    message(text, colour, blink = 0, time = 0)
    {
        this.currentMessage=text;
        this.messageTimer=time;
        this.messageBlink=blink;
        this.messageBlinkTimer = blink;
        this.messageColour=colour;
        this.messageOn=true;
    }
    /**
     * Updates the state 
     * @param {number} dT 
     */
    update(dT)
    {
        this.messageTimer-=dT;
        if(this.messageTimer<=0)
        {
            this.currentMessage="";
        }
        if(this.messageBlink!=0)
        {
            this.messageBlinkTimer-=dT;
            if(this.messageBlinkTimer<=0)
            {
                this.messageOn=!this.messageOn;
                this.messageBlinkTimer+=this.messageBlink;
                if(this.messageBlinkTimer<0)
                {
                    this.messageBlinkTimer=this.messageBlink;
                }
            }
        }
        this.components.forEach((c)=>{c.update(dT);});
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
        
        if(this.currentMessage!="")
        {
            if(this.messageOn)
            {
                ctx.font = "small-caps 32px sixtyfour";
                ctx.textAlign="center";
                ctx.textBaseline="middle";
                ctx.fillStyle=this.messageColour;
                ctx.fillText(this.currentMessage,this.w/2,this.h/3);
            }
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
        for(let i = this.components.length-1;i>=0;i--)
        {
            let c = this.components[i];
            const target = c.checkhit(e.offsetX,e.offsetY);
            // if an element is found, click it and set the flag
            if(target)
            {
                target.click(e);
                return true;
            }

        }
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
/**
 * Utility class for drawing UI elements
 */
class UIRenderer
{
    /**
     * Helper method to create an "rgb(255 0 0 / 0.5)" whatever string for CSS/canvas
     * @param {string} col - colour as 0-255 "R G B" 
     * @param {*} a - optional alpha, 0-1, 1 default
     * @returns 
     */
    static rgb(col, a =1)
    {
        return "rgb(" + col + "/ "+a+")";
    }
    /**
     * Draws a vertically segmented gauge. Depending on the available space, the segments are drawn
     * in whichever style suits best visually, including dropping segmentation if there isn't enough
     * space to draw the correct amount of discrete segments.
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * @param {number} filled - amount of filled blocks
     * @param {number} total - total amount of blocks
     * @param {string} colour - colour of the filled blocks
     */
    // UGLY! #TODO: refactor, THEN add a horisontal version
    static drawGauge(ctx, x, y,w,h, filled, total, colour, horisontal=false)
    {
        // empty segment colour
        let empy ="100 100 100";
        // highlight on the empty segment
        let empylight ="200 200 200";
        // outline of the gauge and segments
        let outline = "120 40 0";
        
        let ax = x;
        let ay = y;
        let aw = w;
        let ah = h;
        if(horisontal)
        {
            ax=x;
            ay=y;
            aw=w;
            ah=h;
        }
        let alongside = horisontal?w:h;
        // this calculates the amount of pixels available to each segment...
        let step = Math.floor(alongside/total);
        // this is the leftover - will be used to shift the gauge downwards to bottom-align with others
        // for some reason that looks less jarring
        let shift = alongside % step;
        // spacing between segments if there's enough space
        let spacing = 2;
        // if there are at least 8 pixels, draw each segment as its own rounded rectangle
        if(step>=8)
        {
            for(let i = 0; i<total;i++)
            {
                ctx.beginPath();
                ctx.lineWidth=2;
                ctx.strokeStyle=this.rgb(outline);
                // empty segments at the top
                    if(horisontal)
                    {
                        ax = x+0+shift+step*i;
                        ay = y;
                        aw = step-1-spacing;
                        ah = h-1;
                    }
                    else
                    {
                        ax = x;
                        ay = y+0+shift+step*i;
                        aw = w-1;
                        ah = step-1-spacing;
                    }
                if((!horisontal && (i<total-filled)) || (horisontal && (i>filled)))
                { 
                    // here, a highlight is created by first drawing
                    // the highlight colour at full size
                    ctx.roundRect(ax, ay, aw, ah,3);
                    ctx.fillStyle=this.rgb(empylight);
                    ctx.fill();
                    // then, the empty colour, which is darker, is drawn as a slightly
                    // smaller rounded rectangle shifted down and right
                    // which leaves a corner of lighter colour in the top-left corner
                    ctx.beginPath();
                    ctx.roundRect(ax+1, ay+1, aw-1, ah-1,3);
                    ctx.fillStyle=this.rgb(empy);
                    ctx.fill();
                }
                else
                {
                    // full segments just get the colour filled in
                    ctx.roundRect(ax, ay, aw, ah,3);
                    ctx.fillStyle=this.rgb(colour);
                    ctx.fill();
                }
                // outline, 2px
                ctx.beginPath();
                ctx.roundRect(ax, ay, aw, ah,3);
                ctx.stroke();
            }
        }
        else
        {
            // not enough space for discrete segments so just draw some lines over a single segment
            const fillPercent = filled/total;
            // height of the empty section basically
            let hempty=(1-fillPercent)*(ah);
            let wempty=w;
            let extraH= horisontal?0:1;
            let extraW=horisontal?1:0;
            if(horisontal)
            {
                wempty=(1-fillPercent)*(aw);
                hempty=h;
            }
            // first draw the full gauge background in the chosen colour
            ctx.fillStyle=this.rgb(colour);
            ctx.beginPath();
            ctx.roundRect(ax+1,ay+1,aw-1-extraW,ah-1-extraH,2);
            ctx.fill();
            // now draw the empty part over it
            ctx.fillStyle=this.rgb(empy);
            ctx.beginPath();
            ctx.roundRect(ax+1, ay+1,wempty-1,hempty-1,2);
            ctx.fill();
            // draw the outline
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle=this.rgb(outline);
            ctx.roundRect(ax,ay, aw-1,ah-1,2);
            ctx.stroke();
            // if we have at least 4 pixels per segment, draw 2 pixel lines at the
            // start of each "segment"
                extraH=horisontal?h-1:0;
                extraW=horisontal?0:w-1;
            if(step>4)
            {
                for(let i = 1; i<total;i++)
                {
                    if(horisontal)
                    {
                        ax = x + step*i;
                    }
                    else
                    {
                        ay = y + step*i;
                    }
                    ctx.beginPath();
                    ctx.moveTo(ax,ay);
                    ctx.lineTo(ax+extraW,ay+extraH);
                    
                    ctx.lineWidth=2;
                    ctx.strokeStyle=this.rgb(outline);
                    
                    ctx.stroke();
                }

            }
            // if at least 2 pixels, do 1 pixel lines instead
            else if(step>1)
            {
                for(let i = 1; i<total;i++)
                {
                    if(horisontal)
                    {
                        ax = x + step*i;
                    }
                    else
                    {
                        ay = y + step*i;
                    }
                    ctx.beginPath();
                    ctx.moveTo(ax+0.5,ay+0.5);
                    ctx.lineTo(ax+0.5+extraW,ay+0.5+extraH);
                    
                    ctx.lineWidth=1;
                    ctx.strokeStyle=this.rgb(outline);
                    
                    ctx.stroke();
                }

            }
            // can't really do anything otherwise, the colours have been drawn at least
        }
    }
    /**
     * Draws a rectangle of a given colour with a fancy outline
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * @param {string} colour - colour of the background
     */
    static drawFrame(ctx,x,y,w,h,colour="")
    {
        // #TODO: remove at least some of this hardcoding please
        let main = colour == ""? "255 64 0" : colour;
        let outline = "120 40 0";
        let outline2 ="255 128 0";
        ctx.beginPath();
        ctx.roundRect(x+0.5,y+0.5,w,h,7);
        ctx.fillStyle=this.rgb(main);
        ctx.fill();
        ctx.strokeStyle=this.rgb(outline);
        ctx.lineWidth=9;
        ctx.stroke();
        ctx.strokeStyle=this.rgb(outline2);
        ctx.lineWidth=5;
        ctx.stroke();
        
    }
    
    /**
     * Draws a rectangle with a fancy outline and some text
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * @param {string} text - text to draw
     */
    static drawScreenBox(ctx,x,y,w,h,text, colour)
    {
        // #TODO: remove at least some of this hardcoding please
        let main = "16 16 16";
        let outline = "40 40 40";
        let outline2 ="128 128 128";
        ctx.beginPath();
        ctx.roundRect(x+0.5,y+0.5,w,h,7);
        ctx.fillStyle=this.rgb(main);
        ctx.fill();
        ctx.strokeStyle=this.rgb(outline);
        ctx.lineWidth=9;
        ctx.stroke();
        ctx.strokeStyle=this.rgb(outline2);
        ctx.lineWidth=5;
        ctx.stroke();
        ctx.font = "small-caps bold 24px sixtyfour";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillStyle=this.rgb(colour);
        ctx.fillText(text,x+w/2,y+h/2);
    }
    
    /**
     * Draws a button.
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * @param {string} text - text of the button
     */
    static drawButton(ctx,x,y,w,h,text, colours=null)
    {
        // outer and inner colours of the border
        let outline = "120 40 0";
        let outline2 ="255 128 0";
        // button colour
        let main ="255 64 0";
        // highlight at the top part of the button
        let highlight="255 200 125";
        // shadow at the bottom part of the button
        let shadow="200 40 0";
        // technically the colour of the "base" from which the button protrudes
        let bottom="100 40 0";
        if(colours)
        {
            [main,highlight,shadow] = [...colours];
        }
        // font  colour
        let fontcolour ="255 230 120";
        // draw the base
        ctx.beginPath();
        ctx.roundRect(x+0.5,y+0.5,w,h,7);
        ctx.fillStyle=this.rgb(bottom);
        ctx.fill();
        // draw the fancy outline of the base
        ctx.strokeStyle=this.rgb(outline);
        ctx.lineWidth=9;
        ctx.stroke();
        ctx.strokeStyle=this.rgb(outline2);
        ctx.lineWidth=5;
        ctx.stroke();
        // the above could've been a drawFrame call
        // whatever
        ctx.beginPath();
        // this is the actual button part, shifted and shrunk to fit the base
        ctx.roundRect(x+2.5, y-2, w-5, h-3, 5);
        ctx.fillStyle=this.rgb(main);
        ctx.fill();
        // add a highlight gradient, harsher at the top, tailing to zero
         let grad = ctx.createLinearGradient(x+(w/2),y-2,x+(w/2),y+h);
        grad.addColorStop(0,this.rgb(highlight));
        grad.addColorStop(0.4,this.rgb(highlight,0.3));
        grad.addColorStop(1,this.rgb(highlight,0.0));
        ctx.fillStyle=grad;
        ctx.fill();
        // now the same but shadow
        let grad2 = ctx.createLinearGradient(x+(w/2),y-2,x+(w/2),y+h);
        grad2.addColorStop(0,this.rgb(shadow,0.0));
        grad2.addColorStop(0.7,this.rgb(shadow,0.3));
        grad2.addColorStop(1,this.rgb(shadow));
        ctx.fillStyle=grad2;
        ctx.fill();
        // now outline the actual button in a single 1px stroke to make it more physical
        ctx.strokeStyle=this.rgb(outline);
        ctx.lineWidth=1;
        ctx.stroke();
        // font, #TODO: replace with something cooler, Geo font looks nice
        ctx.font = "small-caps bold 64px geo";
        // braindead centering logic at 3AM
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        // draw the shit
        ctx.strokeStyle=this.rgb(outline);
        ctx.fillStyle=this.rgb(fontcolour);
        ctx.fillText(text,x+w/2,y+h/2-2);
        ctx.strokeText(text,x+w/2,y+h/2-2);
        // ahh
    }
}

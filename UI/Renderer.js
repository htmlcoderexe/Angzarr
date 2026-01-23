class UIRenderer
{
    static rgb(col, a =1)
    {
        return "rgb(" + col + "/ "+a+")";
    }

    static drawGauge(ctx, x, y,w,h, filled, total, colour)
    {

    let empy ="100 100 100";
    let empylight ="200 200 200";
    let outline = "120 40 0";
    let step = Math.floor(h/total);
    let shift = h % step;
    let spacing = 2;
    if(step>=8)
    {
        for(let i = 0; i<total;i++)
        {
            ctx.beginPath();
           ctx.lineWidth=2;
            ctx.strokeStyle=this.rgb(outline);
            if(i<(total-filled))
            { 
                ctx.roundRect(x+0,y+0+shift+step*i, w-1,step-1-spacing,3);
                ctx.fillStyle=this.rgb(empylight);
                ctx.fill();
                ctx.beginPath();
                ctx.roundRect(x+0+1,y+0+1+shift+step*i, w-1-1,step-1-spacing-1,3);
                ctx.fillStyle=this.rgb(empy);
                ctx.fill();
            }
            else
            { 
                ctx.roundRect(x+0,y+0+shift+step*i, w-1,step-1-spacing,3);
                ctx.fillStyle=this.rgb(colour);
                ctx.fill();
            }
            ctx.beginPath();
            ctx.roundRect(x+0,y+0+shift+step*i, w-1,step-1-spacing,3);
            ctx.stroke();
        }
    }
    else
    {
        const fillPercent = filled/total;
        const hempty=(1-fillPercent)*(h-1);
        const hfull=fillPercent*(h-1);
        ctx.fillStyle=this.rgb(colour);
        ctx.beginPath();
        ctx.roundRect(x+1,y+1,w-1,h-2,2);
        ctx.fill();
        ctx.fillStyle=this.rgb(empy);
        ctx.beginPath();
        ctx.roundRect(x+1, y+1,w-1,hempty,2);
        ctx.fill();
        ctx.beginPath();
        
        
        ctx.lineWidth=2;
        ctx.strokeStyle=this.rgb(outline);
        ctx.roundRect(x+0,y+0, w-1,h-1,2);
        ctx.stroke();

        if(step>4)
        {
            for(let i = 1; i<total;i++)
            {
                ctx.beginPath();
                //ctx.roundRect(x+0.5,y+0.5+step*i, w-1,step-1-spacing,2);
                ctx.moveTo(x+0,y+0+step*i);
                ctx.lineTo(x+0+w-1,y+0+step*i);
                
                ctx.lineWidth=2;
                ctx.strokeStyle=this.rgb(outline);
                
                ctx.stroke();
            }

        }
        else if(step>1)
        {
            for(let i = 1; i<total;i++)
            {
                ctx.beginPath();
                //ctx.roundRect(x+0.5,y+0.5+step*i, w-1,step-1-spacing,2);
                ctx.moveTo(x+0.5,y+0.5+step*i);
                ctx.lineTo(x+0.5+w-1,y+0.5+step*i);
                
                ctx.lineWidth=1;
                ctx.strokeStyle=this.rgb(outline);
                
                ctx.stroke();
            }

        }
    }
        
    }

    static drawFrame(ctx,x,y,w,h,colour="")
    {
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
    static drawButton(ctx,x,y,w,h,text)
    {
        let main ="255 64 0";
        let highlight="255 200 125";
        let shadow="200 40 0";
        let outline = "120 40 0";
        let outline2 ="255 128 0";
        let bottom="100 40 0";
        let fontcolour ="255 230 120";
        ctx.beginPath();
        ctx.roundRect(x+0.5,y+0.5,w,h,7);
        ctx.fillStyle=this.rgb(bottom);
        ctx.fill();
        ctx.strokeStyle=this.rgb(outline);
        ctx.lineWidth=9;
        ctx.stroke();
        ctx.strokeStyle=this.rgb(outline2);
        ctx.lineWidth=5;
        ctx.stroke();
        ctx.beginPath();
        ctx.roundRect(x+2.5,y-2,w-5,h-3,5);
        ctx.fillStyle=this.rgb(main);
        ctx.fill();
        let grad = ctx.createLinearGradient(x+(w/2),y-2,x+(w/2),y+h);
        grad.addColorStop(0,this.rgb(highlight));
        grad.addColorStop(0.4,this.rgb(highlight,0.3));
        grad.addColorStop(1,this.rgb(highlight,0.0));
        ctx.fillStyle=grad;
        ctx.fill();
        let grad2 = ctx.createLinearGradient(x+(w/2),y-2,x+(w/2),y+h);
        grad2.addColorStop(0,this.rgb(shadow,0.0));
        grad2.addColorStop(0.7,this.rgb(shadow,0.3));
        grad2.addColorStop(1,this.rgb(shadow));
        ctx.fillStyle=grad2;
        ctx.fill();
        ctx.strokeStyle=this.rgb(outline);
        ctx.lineWidth=1;
        ctx.stroke();
        ctx.font = "small-caps bold 30px monospace";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.strokeStyle=this.rgb(outline);
        ctx.fillStyle=this.rgb(fontcolour);
        ctx.fillText(text,x+w/2,y+h/2-2);
        ctx.strokeText(text,x+w/2,y+h/2-2);
    }
}

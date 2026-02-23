const TEXT_ALIGN_CENTRE = 0;
const TEXT_ALIGN_LEFT = 1;
const TEXT_ALIGN_RIGHT = 2;
class WrappedText extends UIElement
{
    lines = [];
    font ="bold 26px roboto";
    linespace=1;
    lineheight=1;
    fill="#FFFFFF";
    align = TEXT_ALIGN_LEFT;
    constructor(rekt,text="Lorem ipsum dolor sit on ur mums face lmao gottem") // default test string courtesy of xochi
    {
        super(rekt);

        this.addText(text);
    }
    addText(text, newline=false)
    {
        let currentline = "";
        let words = text.split(" ");
        if(!newline && this.lines.length>0)
        {
            currentline=this.lines.pop();
        }
        words.forEach((word)=>{
            let attempt = currentline+word;
            let [strw,strh] = window.gameManager.sizeText(attempt,this.font);
            this.lineheight=strh;
            if(strw>this.w)
            {
                this.lines.push(currentline);
                currentline="";
            }
            currentline+=word+" ";
        });
                this.lines.push(currentline);
        let x=this.originalHitbox.x;
        let y=this.originalHitbox.y;
        let h=this.lines.length*this.lineheight;
        let w=this.w;
        this.hitbox=new Rectangle(x,y,w,h);
        this.originalHitbox= new Rectangle(x,y,w,h);
///        this.originalHitbox.height = this.lines.length*this.lineheight;
    }
    drawControl(ctx)
    {
        ctx.font = this.font;
        ctx.fillStyle=this.fill;
        ctx.textBaseline="top";
        let multiplier = 0;
        switch(this.align)
        {
            case TEXT_ALIGN_CENTRE:
            {
                multiplier=1;
                ctx.textAlign="center";
                break;
            }
            case TEXT_ALIGN_LEFT:
            {
                multiplier =0;
                ctx.textAlign="left";
                break;
            }
            case TEXT_ALIGN_RIGHT:
            {
                multiplier = 2;
                ctx.textAlign="right";
                break;
            }
        }
        ctx.translate(this.w/2*multiplier,0);
        let linesDrawn = 0;
        this.lines.forEach((l,i)=>{
            ctx.fillText(l,0,0);
            ctx.translate(0,this.lineheight);
            linesDrawn=i+1;
        });
        ctx.translate(this.w/2*multiplier,-this.lineheight*linesDrawn);
    }
}
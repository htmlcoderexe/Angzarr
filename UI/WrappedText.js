class WrappedText extends UIElement
{
    lines = [];
    font ="bold 26px roboto";
    linespace=1;
    lineheight=1;
    fill="#FFFFFF";
    constructor(rekt,text)
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
        this.lines.forEach((l,i)=>{
            ctx.fillText(l,0,0);
            ctx.translate(0,this.lineheight);
        });
    }
}
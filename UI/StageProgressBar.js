/**
 * Defines an indicator of the player's progress within a stage.
 */
class StageProgressBar extends UIElement
{
    progress = 0.0;
    paused = false;
    markers = [];
    static {
        UIElement.controlRegistry.stageprogress=this;
    }
    
    drawControl(ctx)
    {
        const endsize=12;
        const startsize=12
        const end = endsize;
        const start = this.hitbox.height-startsize;
        const pos = (1-this.progress)*(start-end);
        const centre=this.hitbox.width/2;
        const linewidth=4;
        ctx.fillStyle="#40A0FF";
        // line
        ctx.fillRect(
            centre-linewidth/2,
            end,
            linewidth,
            this.hitbox.height-endsize-startsize);
        ctx.beginPath();
        // finish marker
        ctx.fillStyle="#FF1010";
        ctx.arc(centre,
            end-endsize/2,
            endsize/2+2,
            0,Math.PI*2,true
        );
        ctx.fill();
        ctx.beginPath();
        // start marker
        ctx.fillStyle="#00AF60";
        ctx.arc(centre,
            start-startsize/2,
            endsize/2,
            0,Math.PI*2,true
        );
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle="#FF6000";
        ctx.moveTo(centre,pos-6);
        ctx.lineTo(centre+9,pos+18);
        ctx.lineTo(centre,pos+9);
        ctx.lineTo(centre-9,pos+18);
        ctx.closePath();
        ctx.fill();
    }
}
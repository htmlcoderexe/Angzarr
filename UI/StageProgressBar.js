/**
 * Defines an indicator of the player's progress within a stage.
 */
class StageProgressBar extends UIElement
{
    progress = 0.0;
    paused = false;
    markers = [];
    
    draw(ctx)
    {
        super.draw(ctx);
        ctx.fillStyle="#00A000";
        ctx.fillRect(
            this.hitbox.x+6,
            this.hitbox.y
            ,12,this.hitbox.height);
        ctx.fillStyle="#FFA000";
        ctx.fillRect(
            this.hitbox.x,
            this.hitbox.y+((this.hitbox.height-48)*(1-this.progress)+24),
            24,24);
        ctx.fillStyle="#FF0000";
        ctx.fillRect(
            this.hitbox.x,
            this.hitbox.y,
            24,24);
        ctx.fillRect(
            this.hitbox.x,
            this.hitbox.y+this.hitbox.height-24
            ,24,24);
    }
}
class Hostile extends Actor
{
    size = 50;
    constructor()
    {
        super("hostile");
        this.speed= 100;
        this.hitbox = new Rectangle(-25,-25,50,50);
        this.originalHitbox = new Rectangle(-25,-25,50,50);
    }
    draw(ctx)
    {
        let colr ="#FF00FF";
        if(this.HP<(this.MaxHP*0.9))
        {
            colr ="#7F007F";
        }
        if(this.HP<(this.MaxHP*0.5))
        {
            colr ="#7F0000";
        }
        ctx.fillStyle = colr;
        ctx.fillRect(this.hitbox.x,this.hitbox.y,this.hitbox.width,this.hitbox.height);
        super.draw(ctx);
    }
    update(dT)
    {
        super.update(dT);
        this.targetX = this.scene.player.x;
        this.targetY = this.scene.player.y;
    }
}
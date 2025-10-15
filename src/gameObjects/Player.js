class Player extends Actor
{
    bullets_per_sec = 5;
    shootingCoolDown = 0;
    constructor()
    {
        super("player");
        this.speed=1200.00;
        this.hitbox = new Rectangle(-10,-10,20,20);
        this.originalHitbox = new Rectangle(-10,-10,20,20);
    }
    draw(ctx)
    {
        ctx.fillStyle = "#FF00FF";
        ctx.fillRect(this.x-10,this.y-10,20,20);
    }
    update(dT)
    {
        super.update(dT);
        this.shootingCoolDown-=dT;
        if(this.shootingCoolDown<=0)
        {
            const bulletCD = 1/this.bullets_per_sec;
            this.shootingCoolDown+=bulletCD;
            let bb = new Projectile();
            bb.x=this.x;
            bb.y=this.y;
            bb.targetX=this.x;
            bb.targetY =-1;
            bb.speed = 1200;
            this.scene.addObject(bb);
        }
    }
}
class Player extends Actor
{
    bullets_per_sec = 5;
    shootingCoolDown = 0;
    body_path = "m 0,-48 c 14,0 32,48 32,96 h -64 c 0,-48 18,-96 32,-96 z";
    constructor()
    {
        super("player");
        this.speed=1200.00;
        this.hitbox = new Rectangle(-10,-10,20,20);
        this.originalHitbox = new Rectangle(-10,-10,20,20);
    }
    draw(ctx)
    {
        ctx.fillStyle = "#FF6000";
        const p = new Path2D("M " + this.x + "," + this.y+ " " +this.body_path);
        
        ctx.fill(p);
        //ctx.fillRect(this.x-10,this.y-10,20,20);
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
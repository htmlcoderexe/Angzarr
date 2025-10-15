class Projectile extends GameObject
{
    friendly = false;
    damage = 4;
    constructor()
    {
        super("bullet");
        this.hitbox = new Rectangle(-5,-5,10,30);
        this.originalHitbox = new Rectangle(-5,-5,10,30);
        
    }
    draw(ctx)
    {
        
        const grad = ctx.createLinearGradient(this.x,this.y-5,this.x,this.y+30);
        grad.addColorStop(0, "rgb(255 255 0)");
        grad.addColorStop(1,"rgb(255 120 0 / 0.2)");
        ctx.fillStyle = grad;
        ctx.fillRect(this.x-5,this.y-5,10,30);
    }
    hit(other)
    {
        other.HP-=this.damage;
        this.die();
    }
    update(dT)
    {
        if(this.isDead)
        return;
        //console.log("WTFFFFFFFFF",this);
        // special bullet stuff goes here
        super.update(dT);

        if(this.x<0 || this.x>10000 || this.y<0 || this.y>10000)
        {
            console.log(this, "died.");
            this.isDead=true;
        }
    }
}
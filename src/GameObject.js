class GameObject
{
    type = "object";
    scene = null;
    x = 0;
    y = 0;
    targetX = 0;
    targetY = 0;
    speed = 0;
    isDead = false;
    originalHitbox = null;
    hitbox = null;
    constructor(type)
    {
        this.type = type;
        this.originalHitbox = new Rectangle(0,0,1,1);
        this.hitbox = new Rectangle(0,0,1,1);
    }
    onDeath = function(){};
    die()
    {
        this.onDeath();
        this.isDead=true;
    }
    recalcHitbox()
    {
        
        this.hitbox.x= this.originalHitbox.x+this.x;
        this.hitbox.y=this.originalHitbox.y+this.y;
        this.hitbox.width = this.originalHitbox.width;
        this.hitbox.height = this.originalHitbox.height;
    }
    update(dT)
    {
        if(this.isDead)
            return;
        // skipping useless calc
        if(this.speed==0 || (this.x==this.targetX && this.y == this.targetY))
        {
            this.recalcHitbox();
            return;
        }
        const xDiff = this.targetX-this.x;
        const yDiff = this.targetY-this.y;
        const axisAngle = Math.atan2(yDiff,xDiff);
        const dX = this.speed * Math.cos(axisAngle) * dT;
        const dY = this.speed * Math.sin(axisAngle) * dT;
        this.x+=dX;
        this.y+=dY;
        // snap the object to the destination coord if close enough
        // no more odd jitter
        if(Math.abs(xDiff)<Math.abs(dX))
        {
            this.x=this.targetX;
        }
        if(Math.abs(yDiff)<Math.abs(dY))
        {
            this.y=this.targetY;
        }
        this.recalcHitbox();
    }
    draw(ctx)
    {

    }
}
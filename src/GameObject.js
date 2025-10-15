class GameObject
{
    scene = null;
    x = 0;
    y = 0;
    targetX = 0;
    targetY = 0;
    speed = 0;
    isDead = false;
    update(dT)
    {
        // skipping useless calc
        if(this.speed==0 || (this.x==this.targetX && this.y == this.targetY))
        {
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
    }
    draw(ctx)
    {

    }
}
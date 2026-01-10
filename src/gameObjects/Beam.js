class VerticalBeam extends GameObject
{
    
    friendly = false;
    damage = 10;
    fadetimer = 1.0;
    maxfade = 1.0;
    innerColour = [200,255,220,1];
    outerColour = [20,200,150,0.5];
    constructor(width, startX, startY, endX, endY)
    {
        super("beam");
        this.hitbox = new Rectangle(
            startX-width/2,
            startY,
            width,
            endY-startY
        );
        this.originalHitbox  = new Rectangle(
            startX-width/2,
            startY,
            width,
            endY-startY
        );
    }
    draw(ctx)
    {
        const grad = ctx.createLinearGradient(this.hitbox.x,0,this.hitbox.x+this.hitbox.width,0);
        let fade=Math.min(1,(2*this.fadetimer/this.maxfade));
        grad.addColorStop(0, `rgb(${this.outerColour[0]} ${this.outerColour[1]} ${this.outerColour[2]}/ ${this.outerColour[3] * fade})`);
        grad.addColorStop(0.5, `rgb(${this.innerColour[0]} ${this.innerColour[1]} ${this.innerColour[2]}/ ${this.innerColour[3] * fade})`);
        grad.addColorStop(1, `rgb(${this.outerColour[0]} ${this.outerColour[1]} ${this.outerColour[2]}/ ${this.outerColour[3] * fade})`);
        ctx.fillStyle = grad;
        ctx.fillRect(this.hitbox.x,this.hitbox.y,this.hitbox.width,this.hitbox.height);
    }
    update(dT)
    {
        if(this.isDead)
            return;
        this.fadetimer-=dT;
        if(this.fadetimer<=0)
        {
            this.isDead=true;
            return;
        }

    }
}
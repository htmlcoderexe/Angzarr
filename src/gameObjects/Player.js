class Player extends GameObject
{
    constructor()
    {
        super();
        this.speed=1200.00;
    }
    draw(ctx)
    {
        ctx.fillStyle = "#FF00FF";
        ctx.fillRect(this.x-10,this.y-10,20,20);
    }
}
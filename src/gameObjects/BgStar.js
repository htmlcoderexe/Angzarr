class BgStar extends GameObject
{
    size = 10;
    colour ="";
    constructor()
    {
        super();
        this.speed = 500 +(Math.random()*200);
        this.size = 8 +(Math.random()*4);
        let r = 200 + Math.random()*55;
        let g = 200 + Math.random()*55;
        let b = 200 + Math.random()*55;
        let a = 0.1+ Math.random()*0.5;
        this.colour = "rgb("+ r + " "+g+" " +b+ " / " + a +")";
    }
    draw(ctx)
    {
        
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x-(this.size/2),this.y-(this.size/2),this.size,this.size);
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
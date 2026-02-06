/**
 * Background "stars" or other parallax objects
 */
class BgStar extends GameObject
{
    /**
    Size of the star
     */
    size = 10;
    /**
    Colour of the star
     */
    colour ="";
    constructor()
    {
        super();
        this.layer="bg";
        this.screenMovement=RELATIVE_MOVEMENT_STAGE;
        // randomise speeds, sizes and colours
        this.speed = Math.random()*200;
        this.size = 3;//8 +(Math.random()*4);
        // keep this in a small range for various pastel colours
        let r = 230 + Math.random()*25;
        let g = 230 + Math.random()*25;
        let b = 230 + Math.random()*25;
        // add random transparency to make some look more faded from distance
        let a = 1;// 0.9+ Math.random()*0.05;
        this.colour = "rgb("+ r + " "+g+" " +b+ " / " + a +")";
    }
    draw(ctx)
    {
        
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x-(this.size/2),this.y-(this.size/2),this.size,this.size);
    }
    update(dT)
    {
        // stop processing if dead
        if(this.isDead)
            return;
        super.update(dT);
    }
}
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
        this.screenMovement=RELATIVE_MOVEMENT_STAGE;
        // randomise speeds, sizes and colours
        this.speed = Math.random()*200;
        this.size = 8 +(Math.random()*4);
        // keep this in a small range for various pastel colours
        let r = 200 + Math.random()*55;
        let g = 200 + Math.random()*55;
        let b = 200 + Math.random()*55;
        // add random transparency to make some look more faded from distance
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
        // stop processing if dead
        if(this.isDead)
            return;
        super.update(dT);
        // clean up any objects that are long past the player
        if(this.x<0 || this.x>10000 || this.y<0 || this.y>10000)
        {
            this.isDead=true;
        }
    }
}
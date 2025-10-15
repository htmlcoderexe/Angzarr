class GameSceneDash extends GameScene
{
    player = null;
    gameObjects = [];
    test = {"x":0,"y":0};
    constructor()
    {
        super();
        this.player = new Player();
        this.addObject(this.player);
    }
    addObject(obj)
    { 
        this.gameObjects.push(obj);
        //console.log(this.gameObjects.length);
        obj.scene = this;
        //console.log(obj,this);
    }
    handlePrimaryPointerMove(e)
    {
        this.player.targetX=e.offsetX;
        this.player.targetY = e.offsetY;
        //console.log(e);
    }
    drawBg(ctx)
    {

    }
    draw(ctx)
    {
        this.drawBg(ctx);
        ctx.fillStyle="#000030";
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
        this.gameObjects.forEach((obj)=>{
            obj.draw(ctx);
        });
        //console.log(this.test);
    }
    update(dT)
    {
        console.log(this.gameObjects.length);
        this.gameObjects=this.gameObjects.filter((e)=>!e.isDead);
        this.gameObjects.forEach((obj)=>{
            //console.log(obj);

                obj.update(dT);
            
        });
        if(Math.random()<0.1)
        {
            let star = new BgStar();
            star.x=Math.random()*window.gameManager.ctx.canvas.width;
            star.y=1;
            star.targetX=star.x;
            star.targetY=10001;
            this.addObject(star);
            console.log(star);
        }
        //console.log(living.length);
        //console.log(living);
        //this.gameObjects=living;
    }
}
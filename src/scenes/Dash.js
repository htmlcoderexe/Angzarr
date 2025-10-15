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
        let bullets = this.gameObjects.filter((e)=>e.type=="bullet");
        let baddies = this.gameObjects.filter((e)=>e.type=="hostile");
        bullets.forEach((bb)=>{
            baddies.forEach((enemy)=>{
                if(bb.hitbox.testRect(enemy.hitbox))
                {
                    bb.hit(enemy);
                }
            });
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
        if(Math.random()<0.01)
        {
            let enemy = new Hostile();
            enemy.x=Math.random()*window.gameManager.ctx.canvas.width;
            enemy.y=50+Math.random()*50;
            enemy.targetX=this.player.x;
            enemy.targetY=this.player.y;
            this.addObject(enemy);
            console.log(enemy);
        }
        //console.log(living.length);
        //console.log(living);
        //this.gameObjects=living;
    }
}
class GameSceneDash extends GameScene
{
    player = null;
    gameObjects = [];
    test = {"x":0,"y":0};
    constructor()
    {
        super();
        this.player = new Player();
        this.gameObjects.push(this.player);
    }
    handlePrimaryPointerMove(e)
    {
        this.player.targetX=e.offsetX;
        this.player.targetY = e.offsetY;
        console.log(e);
    }
    draw(ctx)
    {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        this.gameObjects.forEach((obj)=>{
            obj.draw(ctx);
        });
        //console.log(this.test);
    }
    update(dT)
    {
        this.gameObjects.forEach((obj)=>{
            obj.update(dT);
        });
    }
}
class GameSceneDash extends GameScene
{
    gameObjects = [];
    test = {"x":0,"y":0};
    handlePrimaryPointerMove(e)
    {
        this.test.x=e.offsetX;
        this.test.y = e.offsetY;
        console.log(e);
    }
    draw(ctx)
    {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.fillStyle = "#FF00FF";
        ctx.fillRect(this.test.x-10,this.test.y-10,20,20);
        //console.log(this.test);
    }
}
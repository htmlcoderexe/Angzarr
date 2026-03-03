class SceneLanded extends GameScene
{
    constructor(player, location=null)
    {
        super();
        this.player=player;
        $show("system","location_test",[0,0],this);
    }
    update(dT)
    {
        this.uimgr.update(dT);
        
        // ditch any dead objects 
        this.gameObjects=this.gameObjects.filter((e)=>!e.isDead);
        // update what's left
        this.gameObjects.forEach((obj)=>{
            obj.update(dT);
            
        });
    }
    drawBg(ctx)
    {
        
        // clear the sky 
        // should this not be this "BG" that the empty method above is supposed to "draw"?
        ctx.fillStyle="#000030";
        ctx.fillRect(0,0,this.shortSide,this.longSide);
       
        let bgs = this.gameObjects.filter((e)=>e.layer=="bg");
        bgs.forEach((obj)=>{
            obj.draw(ctx);
        });
    }
    draw(ctx)
    {
        this.drawBg(ctx); 
        this.uimgr.draw(ctx);
    }
}
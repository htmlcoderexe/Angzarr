class GameSceneDash extends GameScene
{
    player = null;
    test = {"x":0,"y":0};
    /**
    Game speed.
     */
    speedMultiplier = 1;
    /**
    The distance from the bottom where the game speed is 1x
     */
    normalSpeedSpot = 0.33;
    movingship = false;
    uimgr;
    scoredisplay;
    hiscoredisplay;
    score=0;
    hiscore=0;
    stageProgress = 0;
    constructor()
    {
        super();
        this.player = new Player();
        this.addObject(this.player);
        this.player.x = this.shortSide/2;
        this.player.y = this.longSide - (this.longSide*this.normalSpeedSpot);
        this.uimgr=new GUIManager();
        this.hiscore=localStorage.getItem("bestScore");
        /*
        const bt = new UIButton(new Rectangle(0,this.longSide-100,70,70));
        console.log(this.longSide);
        bt.click = ()=>{
            this.player.doSkill();
        };
        //*/
        const lazor = new Ability(this.player);
        lazor.maxcharge=4;
        lazor.chargeused=4;
        lazor.base_recharge=1;
        lazor.apply=()=>this.player.doSkill();
        this.player.abilities.push(lazor);
        const bt = new AbilitySlot(new Rectangle(10,this.longSide-100,70,72),lazor);
        this.uimgr.components.push(bt);
        const scoredspl= new DisplayLabel(new Rectangle(this.shortSide-220,65,170,45),"000000");
        this.scoredisplay=scoredspl;
        this.uimgr.components.push(scoredspl);
        const hiscoredspl= new DisplayLabel(new Rectangle(this.shortSide-220,10,170,45),"000000");
        this.hiscoredisplay=hiscoredspl;
        this.uimgr.components.push(hiscoredspl);
    }
    handlePrimaryPointerMove(e)
    {
        // aim the plaier towards new pointer location
        this.player.targetX=e.offsetX;
        this.player.targetY = e.offsetY;
        // make stuff go slower when pulling back and faster when pushing forward
        this.speedMultiplier = (this.longSide-e.offsetY)/this.longSide/this.normalSpeedSpot;
        this.speedMultiplier=Math.min(1.5,(Math.max(0.7,this.speedMultiplier)));
        //console.log(e);
    }
    handlePrimaryPointerClick(e)
    {
        let handled = this.uimgr.handleClick(e);
    }
    handleSecondaryPointerClick(e)
    {
        let handled = this.uimgr.handleClick(e);
    }
    handleSecondaryPointerUp(e)
    {
        let handled = this.uimgr.handleClick(e);
    }
    handleKeyDown(e)
    {
        
        console.log("Dash keydown");
        if(e.key==" ")
        {
            this.player.abilities[0].use();
        }
    }
    drawBg(ctx)
    {

    }
    draw(ctx)
    {
        this.drawBg(ctx);
        // clear the sky 
        // should this not be this "BG" that the empty method above is supposed to "draw"?
        ctx.fillStyle="#000030";
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
        this.gameObjects.forEach((obj)=>{
            obj.draw(ctx);
        });
        this.uimgr.draw(ctx);
        //console.log(this.test);
    }
    update(dT)
    {
        if(this.paused)
        {
            return;
        }
        // ditch any dead objects 
        this.gameObjects=this.gameObjects.filter((e)=>!e.isDead);
        // update what's left
        this.gameObjects.forEach((obj)=>{
            obj.update(dT);
            
        });
        // #TODO: less hardcoding
        let bullets = this.gameObjects.filter((e)=>e.type=="bullet");
        let baddies = this.gameObjects.filter((e)=>e.type=="hostile");
        let beams = this.gameObjects.filter((e)=>e.type=="beam");
        let pickups = this.gameObjects.filter((e)=>e.type=="pickup");
        // yea ask every bullet hey did you hit something
        bullets.forEach((bb)=>{
            baddies.forEach((enemy)=>{
                if(bb.hitbox.testRect(enemy.hitbox))
                {
                    // oof
                    bb.hit(enemy);
                }
            });
        });
        // same for beams
        beams.forEach((bb)=>{
            baddies.forEach((enemy)=>{
                if(bb.hitbox.testRect(enemy.hitbox))
                {
                    // ow 
                    bb.hit(enemy);
                }
            });
        });
        this.doSpeedStuff(dT);
        pickups.forEach((enemy)=>{
            if(enemy.hitbox.testRect(this.player.hitbox))
            {
                this.score++;
                enemy.die();
            }
        });
        // update score
        this.scoredisplay.text= String(this.score).padStart(6,'0');
        if(this.score>=this.hiscore)
        {
            this.hiscore=this.score;
            this.hiscoredisplay.colour="255 200 0";
            localStorage.setItem("bestScore", this.hiscore);
        }
        this.hiscoredisplay.text= String(this.hiscore).padStart(6,'0');
        // this.scoredisplay.text = Math.round(this.speedMultiplier*100);
        baddies.forEach((enemy)=>{
            if(enemy.hitbox.testRect(this.player.hitbox))
            {
                // this kills the player
                let retrybt = new UIButton(new Rectangle(
                    this.shortSide/2-240/2,
                    this.longSide*0.60,
                    240,
                    80),
                    "Retry"
                );
                retrybt.clickHandler=()=>{
                    window.gameManager.currentScene = new GameSceneDash();
                };
                this.uimgr.components.push(retrybt);
                this.paused=true;
            }
        });
    }
    /**
     * Stuff that depends on player's speed
     * @param {number} dT 
     */
    // #TODO: this is shit and doesn't even use the dT which is probably why
    // it's even more clustered than RNGesus on crack
    doSpeedStuff(dT)
    {
        // spawn stars with about 10% base chance
        if(Math.random()<0.1*this.speedMultiplier)
        {
            let star = new BgStar();
            // random displacement across the field
            star.x=Math.random()*window.gameManager.ctx.canvas.width;
            // but always at the top
            star.y=1;
            this.addObject(star);
        }
        // spawn baddies with about 1% base chance
        if(Math.random()<0.01*this.speedMultiplier)
        {
            let enemy = new Hostile();
            // random spread across
            enemy.x=Math.random()*window.gameManager.ctx.canvas.width;
            // somewhere near the top
            enemy.y=50+Math.random()*50;
            // go right for the player
            // not really needed as they already do that in their updates?
            // not all of them?
            // this code is shit but it works for now
            enemy.targetX=this.player.x;
            enemy.targetY=this.player.y;
            this.addObject(enemy);
            // toasted baddies drop points?
            enemy.onDeath=()=>{
                
                for(let i=0;i<Math.random()*4;i++)
                {
                    let p = new Pickup();
                    p.x=enemy.x;
                    p.y=enemy.y;
                    p.movementVector.y=-5;
                    p.movementVector.x=-2+Math.random()*4;
                    this.addObject(p);
                }
                
            };
        }
    }
}
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
    stage;
    stageProgressBox;
    mode;
    pause()
    {
        this.paused=true;
        this.uimgr.message("GAME PAUSED","#00C010",0.5,9999);
        let unpausebt = new UIButton(new Rectangle(
            this.shortSide/2-240/2,
            this.longSide*0.60,
            240,
            80),
            "Continue"
        );
        this.uimgr.add(unpausebt,"system");
        let titlebt = new UIButton(new Rectangle(
            this.shortSide/2-240/2,
            this.longSide*0.60+100,
            240,
            80),
            "Exit"
        );
        titlebt.clickHandler=()=>{
            window.gameManager.currentScene = new GameSceneTitle();
        };
        unpausebt.clickHandler=()=>{
            this.uimgr.message("","#000000");
            this.uimgr.remove(unpausebt);
            this.uimgr.remove(titlebt);
            this.paused=false;
        };
        this.uimgr.add(titlebt,"system");
    }
    levelDone()
    {
        this.uimgr.message("LEVEL CLEAR","#00C010",1,9999);
        let retrybt = new UIButton(new Rectangle(
            this.shortSide/2-240/2,
            this.longSide*0.60-50,
            240,
            80),
            "Continue"
        );
        retrybt.clickHandler=()=>{
            // pass the player here to keep progress
            this.uimgr.message("","#000000");
            this.player.level++;
            window.gameManager.currentScene = new GameSceneDash(this.mode,this.player);
        };
        this.uimgr.activeLayer="system";
        this.uimgr.add(retrybt);
        let shopbt = new UIButton(new Rectangle(
            this.shortSide/2-240/2,
            this.longSide*0.60+100,
            240,
            80),
            "Shop"
        );
        shopbt.colourScheme="green";
        shopbt.clickHandler=()=>{
            this.uimgr.activeLayer="system";
            UITemplate.ShowTemplate(this.uimgr,"arcade_shop",[0,this.longSide*0.60],this.player);
        };
        this.uimgr.activeLayer="system";
        this.uimgr.add(shopbt);
        this.paused=true;
    }
    generateArcadeStage(level)
    {

        let testStage = [
            {x:50,y:0,offset:0, type:"eye_swarm"},
            {x:350,y:0,offset:0, type:"eye_swarm"},
            {x:50,y:0,offset:1000, type:"basic_l1"},
            {x:350,y:0,offset:1000, type:"static_spinner"},
            {x:50,y:0,offset:2000, type:"static_spinner"},
            {x:200,y:0,offset:2000, type:"eye_swarm"},
            {x:350,y:0,offset:2000, type:"static_spinner"},
            {x:50,y:0,offset:3000, type:"eye_swarm"},
            {x:350,y:0,offset:3000, type:"basic_l1"},
            {x:50,y:0,offset:4000, type:"static_spinner"},
            {x:350,y:0,offset:4000, type:"static_spinner"},
            {x:50,y:0,offset:5000, type:"eye_swarm"},
            {x:350,y:0,offset:5000, type:"eye_swarm"},
            {x:50,y:0,offset:6000, type:"static_spinner"},
            {x:150,y:0,offset:6500, type:"eye_swarm"},
            {x:250,y:0,offset:7000, type:"eye_swarm"},
            {x:350,y:0,offset:7500, type:"static_spinner"},
            {x:50,y:0,offset:8000, type:"basic_l1"},
            {x:200,y:0,offset:8000, type:"static_spinner"},
            {x:350,y:0,offset:8000, type:"basic_l1"}
        ];
        let fullStage= [];
        let offset_tally=testStage[testStage.length-1].offset+1000;
        for(let i=0;i<this.player.level;i++)
        {
            for(let j=0;j<testStage.length;j++)
            {
                let row = testStage[j];
                let newRow = {x:row.x,y:row.y,type:row.type,offset:row.offset+i*offset_tally};
                fullStage.push(newRow);
            }
        }
        return fullStage;
    }
    constructor(mode="arcade",player = null)
    {
        super();
        this.mode=mode;
        this.player = player ?? new Player();
        this.player.refresh();
        this.addObject(this.player);
        this.player.x = this.shortSide/2;
        this.player.y = this.longSide - (this.longSide*this.normalSpeedSpot);
        this.player.targetX=this.player.x;
        this.player.targetY=this.player.y;
        this.uimgr=new GUIManager(this.shortSide,this.longSide);
        this.uimgr.activeLayer="game";
        this.hiscore=localStorage.getItem("bestScore");
        let lazor;
        if(this.player.abilities.length<1)
        {
            lazor = new Ability(this.player);
            lazor.maxcharge=3;
            lazor.chargeused=2;
            lazor.base_recharge=0.5;
            lazor.apply=()=>this.player.doSkill();
            this.player.abilities.push(lazor);
        }
        else
        {
            lazor = this.player.abilities[0];
        }
        const bt = new AbilitySlot(new Rectangle(10,this.longSide-100,70,72),lazor);
        this.uimgr.add(bt);
        const pBt = new UIButton(
            new Rectangle(
                this.shortSide - 80,
                this.longSide - 80,
                64,64
            ),"||"
        );
        pBt.clickHandler=()=>{
                this.pause();
            };
        this.uimgr.add(pBt);
        const scoredspl= new DisplayLabel(new Rectangle(this.shortSide-180,10,170,45),"000000");
        this.scoredisplay=scoredspl;
        this.uimgr.add(scoredspl);
        const hiscoredspl= new DisplayLabel(new Rectangle(this.shortSide-220,65,170,45),"000000");
        this.hiscoredisplay=hiscoredspl;
        scoredspl.clickHandler=()=>{
            window.gameManager.debug=!window.gameManager.debug;
            console.warn("debug "+(window.gameManager.debug?"en":"dis")+"abled");
        };
        //this.uimgr.add(hiscoredspl);
        this.stageProgressBox = new StageProgressBar(new Rectangle(this.shortSide-24,150,18,400));
        this.uimgr.add(this.stageProgressBox);

        let objs = Stage.load(this.generateArcadeStage(this.player.level));
        this.stage= new Stage(this,objs);
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
        if(e.key=="z")
        {
            window.gameManager.debug=!window.gameManager.debug;
            console.warn("debug "+(window.gameManager.debug?"en":"dis")+"abled");            
        }
    }
    drawBg(ctx)
    {
        
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        // clear the sky 
        // should this not be this "BG" that the empty method above is supposed to "draw"?
        ctx.fillStyle="#000030";
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
       
        let bgs = this.gameObjects.filter((e)=>e.layer=="bg");
        bgs.forEach((obj)=>{
            obj.draw(ctx);
        });
    }
    draw(ctx)
    {
        this.drawBg(ctx); 
        let actives = this.gameObjects.filter((e)=>e.layer!="bg");
        actives.forEach((obj)=>{
            obj.draw(ctx);
        });
        
        this.uimgr.draw(ctx,"game");
        UIRenderer.drawGauge(ctx, 10,10,120,32,this.player.HP, this.player.MaxHP,"255 30 30",true);
        if(this.paused)
        {
            ctx.save();
            ctx.fillStyle="rgb(0 0 48 / 0.7)";
            ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
            ctx.restore();
        }
        this.uimgr.draw(ctx,"system");
        //console.log(this.test);
    }
    update(dT)
    {
        this.uimgr.update(dT);
        if(this.paused)
        {
            return;
        }
        if(!this.visible)
        {
            this.pause();
        }
        // ditch any dead objects 
        this.gameObjects=this.gameObjects.filter((e)=>!e.isDead);
        let baddies = this.gameObjects.filter((e)=>e.type=="hostile");
        let pickups = this.gameObjects.filter((e)=>e.type=="pickup");
        // check if stage is cleared
        if(this.stage.finished && baddies.length==0 && pickups.length==0)
        {
            this.levelDone();
        }
        // update what's left
        this.gameObjects.forEach((obj)=>{
            obj.update(dT);
            
        });
        // #TODO: less hardcoding
        let bullets = this.gameObjects.filter((e)=>e.type=="bullet" && e.friendly==true);
        let enemy_bullets = this.gameObjects.filter((e)=>e.type=="bullet" && e.friendly==false);
        let beams = this.gameObjects.filter((e)=>e.type=="beam");
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
                this.player.currentScore++;
                this.player.coins++;
                enemy.die();
            }
        });
        this.score=this.player.currentScore;
        // this.stage.progress += STAGE_DEFAULT_SPEED*this.speedMultiplier*dT;
        this.stage.update(dT);
        this.stageProgressBox.progress = (this.stage.progress/this.stage.duration);
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
        baddies.push(...enemy_bullets);
        baddies.forEach((enemy)=>{
            if(enemy.hitbox.testRect(this.player.hitbox))
            {
                if(enemy.type=="bullet")
                {
                    enemy.hit(this.player);
                }
                if(enemy.type=="hostile")
                {
                    let hpdiff = this.player.HP - enemy.HP;
                    if(hpdiff>0)
                    {
                        enemy.die();
                        this.player.HP-=enemy.HP;
                    }
                    else
                    {
                        this.player.HP=0;
                    }
                }
            }
        });
        if(this.player.HP<=0)
        {
            this.gameOver();
        }
    }
    gameOver()
    {
        // this kills the player
                if(this.hiscore==this.score)
                {
                    this.uimgr.message("HIGH SCORE","#FF6020",0.25,9999);
                }
                else
                {
                    this.uimgr.message("GAME OVER","#FF0020",1,9999);
                }
                
                let retrybt = new UIButton(new Rectangle(
                    this.shortSide/2-240/2,
                    this.longSide*0.60,
                    240,
                    80),
                    "Retry"
                );
                retrybt.clickHandler=()=>{
                    window.gameManager.currentScene = new GameSceneDash(this.mode);
                };
                this.uimgr.activeLayer="system";
                this.uimgr.add(retrybt);
                this.paused=true;
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
        if(Math.random()<0.5*this.speedMultiplier)
        {
            let star = new BgStar();
            // random displacement across the field
            star.x=Math.random()*window.gameManager.ctx.canvas.width;
            // but always at the top
            star.y=1;
            this.addObject(star);
        }
        // spawn baddies with about 1% base chance
        if(false && Math.random()<0.01*this.speedMultiplier)
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
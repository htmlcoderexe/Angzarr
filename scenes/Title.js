class GameSceneTitle extends GameScene
{
    logo={
        "idle":[
            [
                {
                    time:0,
                    fill:"#FF6700FF",
                    path:"M 51.232 -8.401 L 56.524 -5.635 L 74.95 -6.344 L 79.439 -9.651 L 78.73 -17.092 L 75.423 -20.99 L 55.717 -20.339 L 51.399 -15.741 Z M 42.9038 -6.8246 L 44.078 -21.19 L 51.192 -28.813 L 74.611 -29.424 L 73.926 -36.392 L 70.251 -43.742 H 46.197 L 40.852 -37.729 L 37.01 -45.079 L 44.29 -52.055 L 75.931 -52.094 L 83.949 -38.731 L 89.575 -7.165 L 96.395 -7.986 L 98.73 -0.083 L 84.897 -3.156 L 79.886 -0.484 L 41.8459 -0.0833 Z M 154.089 34.712 C 153.616 31.878 133.147 -52.055 133.147 -52.055 H 139.041 L 141.017 -46.753 L 147.782 -52.055 H 172.114 L 176.729 -45.164 L 171.641 -38.826 L 165.499 -44.496 H 150.38 L 142.348 -38.826 L 161.482 34.88 Z M 108.416 34.761 L 88.298 -52.055 H 96.802 L 97.747 -43.551 L 104.362 -52.055 L 126.615 -50.638 L 133.147 -52.055 L 136.773 -36.936 L 121.89 -43.551 L 107.669 -43.078 L 99.164 -35.046 L 114.945 34.879 Z M 12.738 -83.682 L -20.002 -46.598 L 16.413 -17.866 L -12.987 11.867 L -7.307 -14.191 L -14.657 -8.512 L -18.666 27.903 L 19.086 12.201 L 10.065 10.531 L -10.314 14.54 L 37.795 -16.864 L -7.975 -45.262 L 34.454 -74.661 Z M 0.043 -89.695 C 0.043 -88.359 -0.1729 -0.0833 -0.1729 -0.0833 H 41.8458 L 42.9038 -6.8246 L 7.0584 -8.1782 L 7.059 -91.031 Z M -55.604 -14.201 C -55.604 -14.201 -52.597 -10.526 -52.263 -8.856 C -51.929 -7.185 -35.225 -9.19 -35.225 -9.19 L -29.0695 -17.6194 L -27.6144 -34.6991 L -33.554 -39.592 H -44.299 L -51.649 -33.912 Z M -58.665 -37.921 L -49.644 -49.615 H -27.875 L -18.854 -36.585 L -23.144 20.544 L -37.51 34.575 L -62.232 35.578 L -57.889 25.221 L -41.185 26.223 L -32.164 16.869 L -30.7098 -5.0325 L -30.8494 -0.0833 L -62.598 -0.084 L -65.08 -7.658 Z M -128.03 -43.021 L -123.157 -67.882 C -123.157 -67.882 -139.33 -44.573 -139.664 -42.903 Z M -179.469 -5.839 L -172.119 -7.176 L -123.45 -82.011 L -132.805 -83.347 L -133.473 -91.366 L -104.066 -90.225 L -109.418 -84.684 L -113.428 -82.011 L -126.684 -6.629 L -120.67 -5.725 L -121.338 -0.103 L -139.305 -0.084 L -134.033 -7.844 L -130.077 -30.58 L -146.205 -31.488 L -165.438 -5.839 H -158.756 L -162.097 -0.083 H -182.9 Z M -111.63 -52.055 L -104.225 -42.516 L -109.433 -6.751 L -120.67 -5.725 L -121.338 -0.103 L -95.964 -0.245 L -97.636 -6.105 L -101.912 -6.401 L -96.952 -32.681 L -89.374 -42.839 L -79.258 -42.721 L -76.202 -33.135 L -81.745 -6.906 L -86.189 -6.61 L -88.955 -0.083 H -62.598 L -65.08 -7.658 L -73.914 -7.174 L -67.064 -39.641 L -74.231 -52.055 H -89.113 H -101.599 Z"
                }
            ]
        ]

    }
    logosprite;
    gameObjects=[];
    speedMultiplier = 1;
    lifetime=0;
    constructor()
    {
        super();
        this.logosprite=VectorSprite.fromRawObject(this.logo);
        let playbt = new UIButton(new Rectangle(
            this.shortSide/2-240/2,
            this.longSide*0.60,
            240,
            80),
            "Play"
        );
        playbt.addEventListener("click",()=>{
            window.gameManager.currentScene = new GameSceneDash("rpg");
        });
        this.uimgr.add(playbt,"system");
    }
    update(dT)
    {
        this.lifetime+=dT;
        this.uimgr.update(dT);
        
        // ditch any dead objects 
        this.gameObjects=this.gameObjects.filter((e)=>!e.isDead);
        // update what's left
        this.gameObjects.forEach((obj)=>{
            obj.update(dT);
            
        });
        if(Math.random()<0.8)
        {
            let star = new BgStar();
            // random displacement across the field
            star.x=Math.random()*window.gameManager.ctx.canvas.width;
            // but always at the top
            star.y=1;
            this.addObject(star);
        }
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
        let yoff=Math.cos(this.lifetime);
        yoff*=10
        yoff-=5;
        ctx.translate(this.shortSide/2,this.longSide/2+yoff);
        this.logosprite.draw(ctx);
        ctx.translate(-this.shortSide/2,-(this.longSide/2+yoff));
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
}
class Hostile extends Actor
{
    basicshape={
        "idle": [
            [
                {
                    "time": 0,
                    "fill": "#000000",
                    "path": "m 0,-25 c 25,0 45,20 45,30 c 0,10 -20,30 -45,30 c -25,0 -45,-20 -45,-30 c 0,-10 20,-30 45,-30 z"
                },
                {
                    "time": 0.8,
                    "fill": "#FF0F89",
                    "path": "m 0,-21 c 15,0 40,25 40,32 c 0,7 -25,32 -40,32 c -15,0 -40,-25 -40,-32 c 0,-7 25,-32 40,-32 z"
                },
                {
                    "time": 1.9,
                    "fill": "#FF0F89",
                    "path": "m 0,-25 c 25,0 45,20 45,30 c 0,10 -20,30 -45,30 c -25,0 -45,-20 -45,-30 c 0,-10 20,-30 45,-30 z"
                }
            ],
            [
                {
                    "time": 0,
                    "fill": "#000000",
                    "path": "m 0,0 c 6,-0 6,15 0,25 c -6,0 -6,-15 0,-25 z"
                },
                {
                    "time": 0.8,
                    "fill": "#003050",
                    "path": "m 0,5 c 6,-0 6,15 0,25 c -6,0 -6,-15 0,-25 z"
                },
                {
                    "time": 1.9,
                    "fill": "#003050",
                    "path": "m 0,0 c 6,-0 6,15 0,25 c -6,0 -6,-15 0,-25 z"
                }
            ]
        ]
    };
    size = 50;
    constructor()
    {
        super("hostile"); 
        this.animation=VectorSprite.fromRawObject(this.basicshape);
       
        this.speed= 100;
        this.hitbox = new Rectangle(-25,-25,50,50);
        this.originalHitbox = new Rectangle(-25,-25,50,50);
    }
    draw(ctx)
    {
        /*/
        let colr ="#FF00FF";
        if(this.HP<(this.MaxHP*0.9))
        {
            colr ="#7F007F";
        }
        if(this.HP<(this.MaxHP*0.5))
        {
            colr ="#7F0000";
        }
        ctx.fillStyle = colr;
        ctx.fillRect(this.hitbox.x,this.hitbox.y,this.hitbox.width,this.hitbox.height);
        //*/
        super.draw(ctx);
    }
    update(dT)
    {
        super.update(dT);
        this.targetX = this.scene.player.x;
        this.targetY = this.scene.player.y;
    }
}
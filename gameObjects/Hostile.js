class Hostile extends Actor
{
    static anim={
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
        super(Hostile.anim, "hostile"); 
        // init some "basic" default values
        this.speed= 100;
        this.hitbox = new Rectangle(-25,-25,50,50);
        this.originalHitbox = new Rectangle(-25,-25,50,50);
    }
    update(dT)
    {
        super.update(dT);
        // home in on the player #TODO: dynamic behaviours
        this.targetX = this.scene.player.x;
        this.targetY = this.scene.player.y;
    }
}
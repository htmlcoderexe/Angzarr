/**
 * These are the bad guys or whatever.
 */
class Hostile extends Actor
{
    static anim={
        "idle": [
            [
                {
                    "time": 0,
                    "fill": "#FF0F89",
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
                    "fill": "#003050",
                    "path": "m 0,0 c 6,-0 6,15 0,25 c -6,0 -6,-15 0,-25 z"
                },
                {
                    "time": 0.8,
                    "fill": "#009050",
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
    static anim2 = {
        "idle": [
            [
                {
                    "time": 0,
                    "rotation": 0,
                    "fill": "#F0FFE0",
                    "path": "m 0.6603 -18.8564 c 20.9115 -34.507 58.3397 32.8564 19.3397 32.8564 c 19.0955 36.2846 -57.2942 32.5955 -37.7942 -1.1795 c -36.2058 -0.8205 -1.5455 -66.3179 18.4545 -31.6769"
                },
                {
                    "time": 0.3,
                    "rotation": 120,
                    "fill": "#CDFF97",
                    "path": "m 0.6603 -18.8564 c 20.9115 -34.507 58.3397 32.8564 19.3397 32.8564 c 19.0955 36.2846 -57.2942 32.5955 -37.7942 -1.1795 c -36.2058 -0.8205 -1.5455 -66.3179 18.4545 -31.6769"
                },
                {
                    "time": 0.6,
                    "rotation": 240,
                    "fill": "#CDFF97",
                    "path": "m 0.6603 -18.8564 c 20.9115 -34.507 58.3397 32.8564 19.3397 32.8564 c 19.0955 36.2846 -57.2942 32.5955 -37.7942 -1.1795 c -36.2058 -0.8205 -1.5455 -66.3179 18.4545 -31.6769"
                },
                {
                    "time": 0.9,
                    "rotation": 360,
                    "fill": "#F0FFE0",
                    "path": "m 0.6603 -18.8564 c 20.9115 -34.507 58.3397 32.8564 19.3397 32.8564 c 19.0955 36.2846 -57.2942 32.5955 -37.7942 -1.1795 c -36.2058 -0.8205 -1.5455 -66.3179 18.4545 -31.6769"
                }
            ]
        ]
    };
    size = 50;
    constructor()
    {
        super(Math.random()>0.5?Hostile.anim2:Hostile.anim, "hostile"); 
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
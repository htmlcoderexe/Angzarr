/**
 * Represents the player.
 */
class Player extends Actor
{
    /**
    Stores the graphics used for the player's ship.
    This is an object with string properties, each property name corresponds
    to an animation name, the "default" one is called "idle".
    Each animation contains an array of parts.
    Each part contains an array of keyframes.
    Each keyframe is an object with properties "time", "fill" and "path".
    "fill" is a hexadecimal colour.
    "path" is a path in the SVG path format.
     */
    // #TODO: store this elsewhere especially if adding customisation
    static anim ={
        "idle": [
            [
                {
                    "time": 0,
                    "fill": "#FFAF00",
                    "path": "m 0,80 c 6,-0 14,-25 14,-40 h -28 c 0,15 8,40 14,40 z"
                },
                {
                    "time": 0.2,
                    "fill": "#FFAF00",
                    "path": "m 0,80 c 6,-0 14,-35 14,-40 h -28 c 0,5 8,40 14,40 z"
                },
                {
                    "time": 0.4,
                    "fill": "#FFAF00",
                    "path": "m 0,80 c 6,-0 14,-25 14,-40 h -28 c 0,15 8,40 14,40 z"
                },
                {
                    "time": 0.6,
                    "fill": "#FFAF00",
                    "path": "m 0,80 c 6,-0 14,-25 14,-40 h -28 c 0,15 8,40 14,40 z"
                },
                {
                    "time": 0.8,
                    "fill": "#FFAF00",
                    "path": "m 0,80 c 6,-0 14,-25 14,-40 h -28 c 0,15 8,40 14,40 z"
                }
            ],
            [
                {
                    "time": 0,
                    "fill": "#FF6000",
                    "path": "m -0 -48 c -19.2 16.8 -12 36 -24 52.8 c -33.6 36 -28.8 24 -16.8 84 c -4.8 -24 9.6 -40.8 21.6 -40.8 h 38.4 c 12 0 26.4 16.8 21.6 40.8 c 12 -60 16.8 -48 -16.8 -84 c -12 -16.8 -4.8 -36 -24 -52.8"
                },
                {
                    "time": 0.2,
                    "fill": "#FF6000",
                    "path": "m -0 -48 c -19.2 16.8 -12 36 -24 52.8 c -33.6 36 -28.8 24 -16.8 84 c -4.8 -24 9.6 -40.8 21.6 -40.8 h 38.4 c 12 0 26.4 16.8 21.6 40.8 c 12 -60 16.8 -48 -16.8 -84 c -12 -16.8 -4.8 -36 -24 -52.8"
                },
                {
                    "time": 0.4,
                    "fill": "#FF6000",
                    "path": "m -0 -48 c -19.2 16.8 -12 36 -24 52.8 c -33.6 36 -28.8 24 -16.8 84 c -4.8 -24 9.6 -40.8 21.6 -40.8 h 38.4 c 12 0 26.4 16.8 21.6 40.8 c 12 -60 16.8 -48 -16.8 -84 c -12 -16.8 -4.8 -36 -24 -52.8"
                },
                {
                    "time": 0.6,
                    "fill": "#FF6000",
                    "path": "m -0 -48 c -19.2 16.8 -12 36 -24 52.8 c -33.6 36 -28.8 24 -16.8 84 c -4.8 -24 9.6 -40.8 21.6 -40.8 h 38.4 c 12 0 26.4 16.8 21.6 40.8 c 12 -60 16.8 -48 -16.8 -84 c -12 -16.8 -4.8 -36 -24 -52.8"
                },
                {
                    "time": 0.8,
                    "fill": "#FF6000",
                    "path": "m -0 -48 c -19.2 16.8 -12 36 -24 52.8 c -33.6 36 -28.8 24 -16.8 84 c -4.8 -24 9.6 -40.8 21.6 -40.8 h 38.4 c 12 0 26.4 16.8 21.6 40.8 c 12 -60 16.8 -48 -16.8 -84 c -12 -16.8 -4.8 -36 -24 -52.8"
                }
            ]
        ]
    };
    /**
    main "gun" fire rate; #TODO: better structure
     */
    bullets_per_sec = 5;
    /**
    keeps track of main gun cooldown.
     */
    shootingCoolDown = 0;
    currentScore = 0;
    coins=0;
    level=1;
    upgrades={
        rof:1,
        cap:1,
        bat:1
    };
    /**
     * Creates a new Player with default settings.
     */
    constructor()
    {
        super(Player.anim, "player");
        // this is the speed in pixels/sec for following the controls.
        this.speed=1200.00;
        // define hitboxes
        this.hitbox = new Rectangle(-10,-10,20,20);
        this.originalHitbox = new Rectangle(-10,-10,20,20);
    }
    update(dT)
    {
        super.update(dT);
        // update and fire main gun
        this.shootingCoolDown-=dT;
        if(this.shootingCoolDown<=0)
        {
            // calculate cooldown based on RoF
            const bulletCD = 1/this.bullets_per_sec;
            // advance the cooldown
            this.shootingCoolDown+=bulletCD;
            // if the player is prevented from shooting for a time,
            // (most commonly if the tab has been paused by the browser)
            // large negative cooldown may accumulate
            // this causes an endless stream of bullets (one per frame)
            // until the cooldown is again positive
            // this prevents that from happening.
            if(this.shootingCoolDown<0)
            {
                this.shootingCoolDown=0;
            }
            // spawn a bullet at player's location
            let bb = new Projectile();
            bb.x=this.x;
            bb.y=this.y;
            // make it home towards the point straight ahead of the player
            bb.targetX=this.x;
            bb.targetY =-1;
            bb.speed = 1200;
            this.scene.addObject(bb);
        }
    }
    /**
     * Currently used as the function for firing the laser
     #TODO: move this into a proper ability definition
     */
    doSkill()
    {
        let beam = new VerticalBeam(50,this.x,this.y,this.x,0);
        this.scene.addObject(beam);
    }
}
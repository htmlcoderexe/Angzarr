/**
 * Represents the player.
 */
class Player extends Actor
{
    
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
        bat:1,
        hp:1
    };
    /**
     * Creates a new Player with default settings.
     */
    constructor()
    {
        super(GraphicsData.get("ship_scout"), "player");
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
            let bb = Projectile.fromTemplate(ProjectileData.projectiles.basic1);
            bb.x=this.x;
            bb.y=this.y;
            // make it home towards the point straight ahead of the player
            bb.targetX=this.x;
            bb.targetY =-1;
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
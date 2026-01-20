class Player extends Actor
{
    static anim ={
        "idle": [
            [
                {
                    "time": 0,
                    "fill": "#000000",
                    "path": "m 0,80 c 6,-0 14,-25 14,-40 h -28 c 0,15 8,40 14,40 z"
                },
                {
                    "time": 0.2,
                    "fill": "#000000",
                    "path": "m 0,80 c 6,-0 14,-35 14,-40 h -28 c 0,5 8,40 14,40 z"
                },
                {
                    "time": 0.4,
                    "fill": "#000000",
                    "path": "m 0,80 c 6,-0 14,-25 14,-40 h -28 c 0,15 8,40 14,40 z"
                },
                {
                    "time": 0.6,
                    "fill": "#000000",
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
                    "fill": "#000000",
                    "path": "m 0,-48 c 14,0 32,48 32,96 h -64 c 0,-48 18,-96 32,-96 z"
                },
                {
                    "time": 0.2,
                    "fill": "#000000",
                    "path": "m 0,-48 c 14,0 32,48 32,96 h -64 c 0,-48 18,-96 32,-96 z"
                },
                {
                    "time": 0.4,
                    "fill": "#000000",
                    "path": "m 0,-48 c 14,0 32,48 32,96 h -64 c 0,-48 18,-96 32,-96 z"
                },
                {
                    "time": 0.6,
                    "fill": "#000000",
                    "path": "m 0,-48 c 14,0 32,48 32,96 h -64 c 0,-48 18,-96 32,-96 z"
                },
                {
                    "time": 0.8,
                    "fill": "#FF6000",
                    "path": "m 0,-48 c 14,0 32,48 32,96 h -64 c 0,-48 18,-96 32,-96 z"
                }
            ]
        ]
    };
    bullets_per_sec = 5;
    shootingCoolDown = 0;
    beamCoolDown = 0;
    body_path = "m 0,-48 c 14,0 32,48 32,96 h -64 c 0,-48 18,-96 32,-96 z";
    constructor()
    {
        super(Player.anim, "player");
        this.speed=1200.00;
        this.hitbox = new Rectangle(-10,-10,20,20);
        this.originalHitbox = new Rectangle(-10,-10,20,20);
    }
    draw(ctx)
    {
        //ctx.fillStyle = "#FF6000";
        //const p = new Path2D("M " + this.x + "," + this.y+ " " +this.body_path);
        ctx.resetTransform();
        ctx.translate(this.x,this.y);
        this.animation.animations['idle'].draw(ctx);
        ctx.resetTransform();
        //ctx.fill(p);
        //ctx.fillRect(this.x-10,this.y-10,20,20);
    }
    update(dT)
    {
        this.animation.animations['idle'].update(dT);
        super.update(dT);
        this.shootingCoolDown-=dT;
        this.beamCoolDown-=dT;
        if(this.beamCoolDown<=0)
        {
            this.beamCoolDown=0;
        }
        if(this.shootingCoolDown<=0)
        {
            const bulletCD = 1/this.bullets_per_sec;
            this.shootingCoolDown+=bulletCD;
            let bb = new Projectile();
            bb.x=this.x;
            bb.y=this.y;
            bb.targetX=this.x;
            bb.targetY =-1;
            bb.speed = 1200;
            this.scene.addObject(bb);
        }
    }
    doSkill()
    {
        let beam = new VerticalBeam(50,this.x,this.y,this.x,0);
        this.scene.addObject(beam);
    }
}
/**
 * Defines a pickup item that can be collected by the player
 */
class Pickup extends GameObject
{
    animation;
    constructor()
    {
        super("pickup");
        this.screenMovement=RELATIVE_MOVEMENT_GRAVITY;
        this.hitbox = new Rectangle(-50,-50,100,100);
        this.originalHitbox = new Rectangle(-50,-50,100,100);
        this.animation=VectorSprite.fromRawObject({
	"idle": [
		[
			{
				"time": 0,
				"rotation": 0,
				"fill": "#FFFF00",
				"path": "M 0 -30 H 0 C 17 -30 30 -17 30 0 C 30 17 17 30 0 30 H 0 C -17 30 -30 17 -30 0 C -30 -17 -17 -30 0 -30"
			},
			{
				"time": 0.4,
				"rotation": 0,
				"fill": "#FFFF00",
				"path": "M -4 -30 H 4 C 10 -30 23 -17 23 0 C 23 17 10 30 4 30 H -4 C -10 30 -23 17 -23 0 C -23 -17 -10 -30 -4 -30"
			},
			{
				"time": 0.6,
				"rotation": 0,
				"fill": "#FFFf00",
				"path": "M -8 -30 H 8 C 10 -30 12 -17 12 0 C 12 17 10 30 8 30 H -8 C -10 30 -12 17 -12 0 C -12 -17 -10 -30 -8 -30"
			},
			{
				"time": 0.7,
				"rotation": 0,
				"fill": "#FFFf00",
				"path": "M -9 -30 H 9 C 9 -25 9 -18 9 0 C 9 18 9 28 9 30 H -9 C -9 28 -9 17 -9 0 C -9 -17 -9 -27 -9 -30"
			},
			{
				"time": 0.8,
				"rotation": 0,
				"fill": "#FFFf00",
				"path": "M -8 -30 H 8 C 10 -30 12 -17 12 0 C 12 17 10 30 8 30 H -8 C -10 30 -12 17 -12 0 C -12 -17 -10 -30 -8 -30"
			},
			{
				"time": 1.0,
				"rotation": 0,
				"fill": "#FFFF00",
				"path": "M -4 -30 H 4 C 10 -30 23 -17 23 0 C 23 17 10 30 4 30 H -4 C -10 30 -23 17 -23 0 C -23 -17 -10 -30 -4 -30"
			},
			{
				"time": 1.3,
				"rotation": 0,
				"fill": "#FFFF00",
				"path": "M 0 -30 H 0 C 17 -30 30 -17 30 0 C 30 17 17 30 0 30 H 0 C -17 30 -30 17 -30 0 C -30 -17 -17 -30 0 -30"
			}
		],
		[
			{
				"time": 0,
				"rotation": 0,
				"fill": "#EFE000",
				"path": "M 0 -30 H 0 C 17 -30 30 -17 30 0 C 30 17 17 30 0 30 H 0 C 17 30 30 17 30 0 C 30 -17 17 -30 0 -30"
			},
			{
				"time": 0.4,
				"rotation": 0,
				"fill": "#EFE000",
				"path": "M -4 -30 H 4 C 10 -30 23 -17 23 0 C 23 17 10 30 4 30 H -4 C 2 30 15 17 15 0 C 15 -17 2 -30 -4 -30"
			},
			{
				"time": 0.6,
				"rotation": 0,
				"fill": "#EFE000",
				"path": "M -8 -30 H 8 C 10 -30 12 -17 12 0 C 12 17 10 30 8 30 H -8 C -6 30 -4 17 -4 0 C -4 -17 -6 -30 -8 -30"
			},
			{
				"time": 0.7,
				"rotation": 0,
				"fill": "#EFE000",
				"path": "M -9 -30 H 9 C 9 -25 9 -18 9 0 C 9 18 9 28 9 30 H -9 C -9 28 -9 17 -9 0 C -9 -17 -9 -27 -9 -30"
			},
			{
				"time": 0.8,
				"rotation": 0,
				"fill": "#EFE000",
				"path": "M -8 -30 H 8 C 6 -30 4 -17 4 0 C 4 17 6 30 8 30 H -8 C -10 30 -12 19 -12 0 C -12 -17 -10 -30 -8 -30"
			},
			{
				"time": 1.0,
				"rotation": 0,
				"fill": "#EFE000",
				"path": "M -4 -30 H 4 C -2 -30 -15 -17 -15 0 C -15 17 -2 30 4 30 H -4 C -10 30 -23 17 -23 0 C -23 -17 -10 -30 -4 -30"
			},
			{
				"time": 1.3,
				"rotation": 0,
				"fill": "#EFE000",
				"path": "M 0 -30 H 0 C -17 -30 -30 -17 -30 0 C -30 17 -17 30 0 30 H 0 C -17 30 -30 17 -30 0 C -30 -17 -17 -30 0 -30"
			}
		]
	]
});
    }
    draw(ctx)
    {
        // ensure object gets cleanly translated
        ctx.resetTransform();
        ctx.translate(this.x,this.y);
        // draw the animation #TODO - make this less hardcoded
        this.animation.animations['idle'].draw(ctx);
        ctx.resetTransform();
    }
    update(dT)
    {
        if(this.animation)
            this.animation.animations['idle'].update(dT);
        super.update(dT);
    }
}
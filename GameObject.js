/**
 * The object and its movements are static relative to the screen.
 */
const RELATIVE_MOVEMENT_STATIC = 0;
/**
 * The object moves relative to the stage (towards the player at stage speed).
 */
const RELATIVE_MOVEMENT_STAGE = 1;
/**
 * The object is influenced by gravity relative to the screen.
 */
const RELATIVE_MOVEMENT_GRAVITY = 2;

const STAGE_DEFAULT_SPEED = 500;

const GRAVITY_DEFAULT = 25;

const OBJ_BEHAVIOURS = {
        constant_speed: {
            default: function(dT) {
                this.targetX = this.x;
                this.targetY = 10000;
            }
        },
        home_and_ram: {
            default: function(dT) {
                this.targetX = this.scene.player.x;
                this.targetY = this.scene.player.y;
            }
        },
        aim: {
            default: function(dT) {
                this.targetX = this.scene.player.x;
                this.targetY = this.scene.player.y;
            // move the object towards the target
            // calculate distances in X and Y
            const xDiff = this.targetX-this.x;
            const yDiff = this.targetY-this.y;
            // get the angle pointing towards target
            const axisAngle = Math.atan2(yDiff,xDiff);
            this.targetX=Math.cos(axisAngle)*10000;
            this.targetY=Math.sin(axisAngle)*10000;
                this.ai_state = "on_the_way";
            },
            on_the_way: function(dT) {

            },
            reached_target: function(dT) {

            }
        },
        wander_top_shoot: {
            default: function(dT) {
                let mw=this.scene.shortSide;
                let mh=this.scene.longSide;
                let x=Math.random()*mw;
                let y=Math.random()*(mh*0.3);
                this.targetX = x
                this.targetY = y;
                this.ai_state = "on_the_way";
            },
            on_the_way: function(dT) {
                if(this.abilities && this.abilities[0])
                {
                    this.abilities[0].use();
                }
            },
            reached_target: function(dT) {
                this.ai_state="default";
            }
        }
    }
/**
 * Represents an object in the game that can be drawn and updated.
 */
class GameObject
{
    /**
    Basic type of an object.
     */
    type = "object";
    /**
    Reference to the scene the object belongs to.
     */
    scene = null;
    /**
    X coordinate of the object.
     */
    x = 0;
    /**
    Y coordinate of the object.
     */
    y = 0;
    /**
    X coordinate the object is currently moving towards.
     */
    targetX = 0;
    /**
    Y coordinate the object is currently moving towards.
     */
    targetY = 0;
    /**
    Speed of the movement towards target coordinates.
     */
    speed = 0;

    movementVector = {x:0,y:0};
    /**
    The movement behaviour of the object.
     */
    screenMovement = RELATIVE_MOVEMENT_STATIC;
    /**
    If object is dead, it shall not be updated or drawn.
     */
    isDead = false;
    /**
    The hitbox of the object without translation to object's coordinates.
     */
    originalHitbox = null;
    /**
    The hitbox of the object relative to the screen, translated by its coordinates.
     */
    hitbox = null;
    /**
    Contains the VectorSprite used to represent the entity on the playing field.
     */
    sprite = null;
    ai_state ="";
    ai_behaviour = null;
    layer = "main";
    /**
     * Creates an instance of the object given type
     * @param {string} type - the type of the object.
     */
    constructor(type)
    {
        this.type = type;
        // init some default values
        this.originalHitbox = new Rectangle(0,0,1,1);
        this.hitbox = new Rectangle(0,0,1,1);
    }
    /**
     * Function to run on object's death.
     */
    onDeath = function(){};
    /**
     * Makes the object die and runs onDeath()
     */
    die()
    {
        this.onDeath();
        this.isDead=true;
    }
    /**
     * Updates the object's hitbox
     */
    recalcHitbox()
    {
        
        this.hitbox.x= this.originalHitbox.x+this.x;
        this.hitbox.y=this.originalHitbox.y+this.y;
        this.hitbox.width = this.originalHitbox.width;
        this.hitbox.height = this.originalHitbox.height;
    }
    /**
     * Updates the object's state given elapsed time.
     * @param {number} dT - elapsed time 
     * @returns 
     */
    update(dT)
    {
        // don't do anything if object is dead
        if(this.isDead)
            return;
        if(this.ai_behaviour)
        {
                console.log(this.ai_behaviour);
            let action = this.ai_behaviour[this.ai_state];
            if(!action)
                action = this.ai_behaviour.default;
            if(action)
            {
                action.call(this,dT);
            }
        }
        if(this.screenMovement==RELATIVE_MOVEMENT_STATIC)
        {
            // move the object towards the target
            // calculate distances in X and Y
            const xDiff = this.targetX-this.x;
            const yDiff = this.targetY-this.y;
            // get the angle pointing towards target
            const axisAngle = Math.atan2(yDiff,xDiff);
            // get offsets based on the angle and object's speed
            this.movementVector.x = this.speed * Math.cos(axisAngle) * dT;
            this.movementVector.y = this.speed * Math.sin(axisAngle) * dT;
            
            // if the new offset "overshoots" the destination,
            // snap the object to the destination coordinate
            // this prevents jitter

            const dist = Math.sqrt(xDiff*xDiff+yDiff*yDiff);
            const delta = Math.sqrt(this.movementVector.x*this.movementVector.x+this.movementVector.y*this.movementVector.y);

            if(delta>dist)
            {
                this.x=this.targetX;
                this.y=this.targetY;
                this.movementVector={x:0,y:0};
                if(this.ai_state=="on_the_way")
                {
                    this.ai_state="reached_target";
                }
            }
        }
        else if(this.screenMovement==RELATIVE_MOVEMENT_STAGE)
        {
            this.movementVector.x=0;
            this.movementVector.y=(STAGE_DEFAULT_SPEED+this.speed)*this.scene.speedMultiplier*dT;
        }
        else if(this.screenMovement==RELATIVE_MOVEMENT_GRAVITY)
        {
            this.movementVector.y+=GRAVITY_DEFAULT*dT;
        }
        this.x+=this.movementVector.x;
        this.y+=this.movementVector.y;
        this.recalcHitbox();
        // clean up any objects that are long past the player
        if(this.x<-1000 || this.x>3000 || this.y<-1000 || this.y>3000)
        {
            this.isDead=true;
        }
        if(this.sprite)
            this.sprite.update(dT);
    }
    /**
     * Draws the object using given canvas context.
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx)
    {
        if(!this.sprite)
            return;
        // ensure object gets cleanly translated
        ctx.resetTransform();
        ctx.translate(this.x,this.y);
        // draw the animation #TODO - make this less hardcoded
        this.sprite.draw(ctx);
        ctx.resetTransform();
        if(window.gameManager.debug)
        {
            ctx.strokeStyle="#FF0000";
            ctx.lineWidth=1;
            ctx.strokeRect(this.hitbox.x+0.5,this.hitbox.y+0.5,this.hitbox.width,this.hitbox.height);
        }
    }
}
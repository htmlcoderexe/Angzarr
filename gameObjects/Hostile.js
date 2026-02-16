/**
 * These are the bad guys or whatever.
 */
class Hostile extends Actor
{
    dropTable = "arcade";
    constructor(gfx=null)
    {
        super(gfx, "hostile"); 
        // init some "basic" default values
        this.speed= 100;
        this.hitbox = new Rectangle(-25,-25,50,50);
        this.originalHitbox = new Rectangle(-25,-25,50,50);
    }
    update(dT)
    {
        super.update(dT);
        // home in on the player #TODO: dynamic behaviours
        //this.targetX = this.scene.player.x;
        //this.targetY = this.scene.player.y;
    }
    static doDrops(table)
    {
        const result = [];
        table.forEach((entry)=>{
            for(let i=0;i<entry.count;i++)
            {
                let amount = RNGesus.roll(entry.roll);
                if(amount>0)
                {
                    for(let j=0;j<amount;j++)
                    {
                        result.push(entry.pickup);
                    }
                }
            }
        });
        return result;
    }
    static fromTemplate(template)
    {
        let result = new Hostile(GraphicsData.get(template.sprite));
        result.MaxHP=template.health;
        result.HP=template.health;
        result.hitbox = new Rectangle(...template.rect);
        result.originalHitbox = new Rectangle(...template.rect);
        result.speed=template.speed;
        result.ai_behaviour=OBJ_BEHAVIOURS[template.behaviour];
        result.abilities = [];
        let a1 = ABILITY_DATA.do_projectile.bind(result);
        let aa1 = new Ability(result);
        aa1.maxcharge=1;
        aa1.chargeused=1;
        aa1.base_recharge=0.5;
        aa1.apply=a1;
        result.abilities[0]=aa1;
        let mvmt = RELATIVE_MOVEMENT_STATIC;
        switch(template.movement_reference)
        {
            case "stage":
            {
                mvmt=RELATIVE_MOVEMENT_STAGE;
                break;
            }
            case "gravity":
            {
                mvmt=RELATIVE_MOVEMENT_GRAVITY;
                break;
            }
        }
        result.screenMovement=mvmt;
        return result;
    }
}
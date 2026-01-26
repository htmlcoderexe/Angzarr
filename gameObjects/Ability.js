/**
 * The ability uses up all available charge.
 */
const ABILITY_USE_ALL_CHARGE = -1;
/**
 * Represents some in-game action with effects, such as special attacks
 */
class Ability
{
    /**
    Use rate of the ability, per minute. This applies before charge requirement.
     */
    rate = 120; // default: twice a second
    /**
    Keeps track of the cooldown.
     */
    cdtimer =0;
    /**
    Current charge available to use.
     */
    charge = 8;
    /**
    Maximum charge capacity.
     */
    maxcharge = 8;
    /**
    Charge required to use the ability.
     */
    chargeused = 1;
    /**
    Ability recharge rate.
     */
    base_recharge = 1; // per second
    /**
    The user of the ability.
     */
    user = null;
    /**
     * Initialises the ability for the given user.
     * @param {Actor} user 
     */
    constructor(user)
    {
        this.user = user;
    }
    /**
     * Uses the ability if possible.
     * @returns 
     */
    use()
    {
        // if the ability is in cooldown, exit
        if(this.cdtimer>0)
        {
            return;
        }
        // if the ability is set to use all charge,
        // apply the ability's effects with the available charge,
        // then set charge to 0 and reset cooldown
        if(this.chargeused==ABILITY_USE_ALL_CHARGE)
        {
            this.apply(this.charge);
            this.charge=0;
            this.cdtimer+=(60/this.rate);
        }
        else
        {
            // else check if there's enough charge
            if(this.charge>=this.chargeused)
            {
                // apply the ability
                this.apply();
                // remove used charge
                this.charge-=this.chargeused;
                // reset cooldown
                this.cdtimer+=(60/this.rate);
            }
        }
    }

    update(dT)
    {
        // add charge
        this.charge += dT*this.base_recharge;
        // prevent charge from going beyond capacity
        if(this.charge>this.maxcharge)
        {
            this.charge=this.maxcharge;
        }
        // run cooldown
        this.cdtimer-=dT;
        // prevent cooldown from dipping below 0
        if(this.cdtimer<0)
        {
            this.cdtimer=0;
        }
    }
    /**
     * Applies the ability's effect, optionally given charge spent
     * @param {number} charge - charge spent on use, allowing for variable effects
     */
    apply(charge=0)
    {

    }
}
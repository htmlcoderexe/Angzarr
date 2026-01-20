
const ABILITY_USE_ALL_CHARGE = -1;
class Ability
{
    rate = 120; // default: twice a second
    charge = 8;
    maxcharge = 8;
    chargeused = 1;
    base_recharge = 1; // per second
    user = null;
    cdtimer =0;
    constructor(user)
    {
        this.user = user;
    }
    use()
    {
        if(this.cdtimer>0)
        {
            return;
        }
        if(this.chargeused==ABILITY_USE_ALL_CHARGE)
        {
            this.apply(this.charge);
            this.charge=0;
            this.cdtimer+=(60/this.rate);
        }
        else
        {
            if(this.charge>=this.chargeused)
            {
                this.apply();
                this.charge-=this.chargeused;
                this.cdtimer+=(60/this.rate);
            }
        }
    }

    update(dT)
    {
        this.charge += dT*this.base_recharge;
        this.cdtimer-=dT;
        if(this.charge>this.maxcharge)
        {
            this.charge=this.maxcharge;
        }
        if(this.cdtimer<0)
        {
            this.cdtimer=0;
        }
    }

    apply(charge=0)
    {

    }
}
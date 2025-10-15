class Actor extends GameObject
{
    HP = 10;
    MaxHP = 10;
    constructor(type="actor")
    {
        super(type);
    }
    update(dT)
    {
        if(this.HP<=0)
            this.die();
        super.update(dT);
    }
}
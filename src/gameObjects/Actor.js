class Actor extends GameObject
{
    basicshape ={};
    animation = null;
    HP = 10;
    MaxHP = 10;
    constructor(type="actor")
    {
        super(type);
        this.animation=VectorSprite.fromRawObject(this.basicshape);
        console.log(this.animation);
    }
    update(dT)
    {
        if(this.animation)
            this.animation.animations['idle'].update(dT);
        if(this.HP<=0)
            this.die();
        super.update(dT);
    }
    draw(ctx)
    {
        
        ctx.resetTransform();
        ctx.translate(this.x,this.y);
        this.animation.animations['idle'].draw(ctx);
        ctx.resetTransform();
    }
}
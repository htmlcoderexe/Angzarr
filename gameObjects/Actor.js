class Actor extends GameObject
{
    basicshape ={};
    animation = null;
    HP = 10;
    MaxHP = 10;
    constructor(shape, type="actor")
    {
        super(type);
        //console.log("made a <" + type + "> with" + shape);
        this.basicshape = shape;
        //console.log(this.basicshape);
        this.animation=VectorSprite.fromRawObject(this.basicshape);
        //console.log(this.animation);
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
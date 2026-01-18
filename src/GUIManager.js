class GUIManager
{
    components = [];
    update(dT)
    {

    }
    draw(ctx)
    {
        this.components.forEach((c)=>{
            c.draw(ctx);
        });
    }
    handlePrimaryPointerMove(e)
    {

    }
    handleSecondaryPointerMove(e)
    {

    }
    handlePrimaryPointerUp(e)
    {

    }
    handleSecondaryPointerUp(e)
    {

    }
    handlePrimaryPointerDown(e)
    {

    }
    handleSecondaryPointerDown(e)
    {

    }
    handlePrimaryPointerClick(e)
    {

    }
    handleClick(e)
    {
        console.log(e);
        let handled = false;
        this.components.forEach((c)=>{
            const target = c.checkhit(e.offsetX,e.offsetY);
            if(target)
            {
                console.log("yeeee");
                target.click();
                handled = true;
            }
        });
        return handled;
    }
    handleKeyDown(e)
    {

    }
    handleKeyUp(e)
    {

    }
    handleKeyPress(e)
    {

    }
}
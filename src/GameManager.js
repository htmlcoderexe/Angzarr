class GameManager
{
    currentScene = null;
    ctx = null;
    prevTime = null;
    update(timestamp)
    {
        if(this.prevTime===null)
        {
            this.prevTime = timestamp;
        }
        const dT = timestamp-this.prevTime;
        if(this.currentScene && this.ctx)
        {
            this.currentScene.update(dT/1000);
            this.currentScene.draw(this.ctx);
        }
        this.prevTime = timestamp;
        requestAnimationFrame((t)=>this.update(t));
    }
    handlePointerMove(e)
    {
        if(e.isPrimary)
        {
            this.currentScene.handlePrimaryPointerMove(e);
        }
        else
        {
            this.currentScene.handleSecondaryPointerMove(e);
        }
        e.preventDefault();
    }
    handlePointerUp(e)
    {

    }
    handlePointerDown(e)
    {

    }
    handlePointerClick(e)
    {

    }
}
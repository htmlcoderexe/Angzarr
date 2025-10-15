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
            this.currentScene.update(dT);
            this.currentScene.draw(this.ctx);
        }
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
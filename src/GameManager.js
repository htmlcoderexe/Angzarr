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
        if(e.isPrimary)
        {
            this.currentScene.handlePrimaryPointerUp(e);
        }
        else
        {
            this.currentScene.handleSecondaryPointerUp(e);
        }
        e.preventDefault();

    }
    handlePointerDown(e)
    {

    }
    handlePointerClick(e)
    {
        if(e.isPrimary)
        {
            this.currentScene.handlePrimaryPointerClick(e);
        }
        else
        {
            this.currentScene.handleSecondaryPointerClick(e);
        }
        e.preventDefault();

    }
    handleKeyDown(e)
    {
        console.log("gamemanager keydown");
        this.currentScene.handleKeyDown(e);
        e.preventDefault();
    }
    handleKeyUp(e)
    {
        this.currentScene.handleKeyUp(e);
        e.preventDefault();

    }
    handleKeyPress(e)
    {
        this.currentScene.handleKeyPress(e);
        e.preventDefault();

    }
}
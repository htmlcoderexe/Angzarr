function doScaleFactor(w,h)
{
    const virtualWidth = 480;
    const virtualHeight = 960;
    const desiredAR = virtualHeight/virtualWidth;
    // ok so we want 1:2 and say 480x960 virtual pixels
    let realAR = h/w;
    let scaleFactor = 1;
    let fakew=1;
    let fakeh=1;
    // it's taller, keep width, pad out the height
    if(realAR>desiredAR)
    {
        scaleFactor=w/virtualWidth;
    }
    // it's wider, pad out width
    else if(realAR<desiredAR)
    {
        scaleFactor=h/virtualHeight;
    }
    return 1/scaleFactor;
}

function Init()
{
    let canvas = document.getElementById("mainscreen");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let scaleFactor = doScaleFactor(canvas.width,canvas.height);
    window.gameManager = new GameManager();
    window.gameManager.scaleFactor = scaleFactor;
    canvas.addEventListener("pointermove",(e)=>window.gameManager.handlePointerMove(e));
    canvas.addEventListener("pointerup",(e)=>window.gameManager.handlePointerUp(e));
    canvas.addEventListener("pointerdown",(e)=>window.gameManager.handlePointerDown(e));
    canvas.addEventListener("click",(e)=>window.gameManager.handlePointerClick(e));
    canvas.addEventListener("keyup",(e)=>window.gameManager.handleKeyUp(e));
    document.addEventListener("keydown",(e)=>window.gameManager.handleKeyDown(e));
    canvas.addEventListener("keypress",(e)=>window.gameManager.handleKeyPress(e));
    window.gameManager.ctx = canvas.getContext("2d");
    window.gameManager.longSide = canvas.height*scaleFactor;
    window.gameManager.shortSide = canvas.width*scaleFactor;
    window.gameManager.currentScene = new GameSceneTitle();
    document.addEventListener("visibilitychange", () => {
            window.gameManager.currentScene.visible=!document.hidden;
            console.log("hidden!");
    });
    document.addEventListener("blur",()=>{
        //window.gameManager.currentScene.visible=false;
        //console.log("blur!");
    });
    // we need this to set it off
    requestAnimationFrame((tstamp)=>{window.gameManager.update(tstamp);});
}
function Init()
{
    let canvas = document.getElementById("mainscreen");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.gameManager = new GameManager();
    canvas.addEventListener("pointermove",(e)=>window.gameManager.handlePointerMove(e));
    canvas.addEventListener("pointerup",(e)=>window.gameManager.handlePointerUp(e));
    canvas.addEventListener("pointerdown",(e)=>window.gameManager.handlePointerDown(e));
    canvas.addEventListener("click",(e)=>window.gameManager.handlePointerClick(e));
    canvas.addEventListener("keyup",(e)=>window.gameManager.handleKeyUp(e));
    document.addEventListener("keydown",(e)=>window.gameManager.handleKeyDown(e));
    canvas.addEventListener("keypress",(e)=>window.gameManager.handleKeyPress(e));
    window.gameManager.ctx = canvas.getContext("2d");
    window.gameManager.currentScene = new GameSceneTitle();
    window.gameManager.currentScene.longSide = canvas.height;
    window.gameManager.currentScene.shortSide = canvas.width;
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
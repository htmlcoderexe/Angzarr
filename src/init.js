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
    window.gameManager.ctx = canvas.getContext("2d");
    window.gameManager.currentScene = new GameSceneDash();
    requestAnimationFrame((tstamp)=>{window.gameManager.update(tstamp);});
}
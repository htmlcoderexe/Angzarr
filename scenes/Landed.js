class SceneLanded extends GameScene
{
    constructor(player, location=null)
    {
        super();
        this.player=player;
        $show("system","location_test",[0,0],this);
    }
}
const EQUIP_NONE = 0;
const EQUIP_HULL = 1;
const EQUIP_MAIN_WEAPON = 2;
const EQUIP_MODULE = 3;
class InventoryItem
{
    inventorySprite = null;
    name = "Unspecifed Item";
    nameFill = "#FFFFFFFF";
    nameStroke = "#000000FF";
    grade = 0;
    slot = EQUIP_NONE;
    stats = [];
    level = 0;
    socketCount=0;
    socketItems = [];

    static fromTempalte(tpl)
    {
        let result = new InventoryItem();
        result.inventorySprite = VectorAnimation.fromTempalte(ItemData.graphics[tpl.sprite]);
        
    }
}
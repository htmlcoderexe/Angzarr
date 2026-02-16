const EQUIP_NONE = 0;
const EQUIP_HULL = 1;
const EQUIP_MAIN_WEAPON = 2;
const EQUIP_MODULE = 3;
class InventoryItem
{
    static ColourGrades = [
        "#FFFFFFFF",
        "#10FF40FF",
        "#4D20CFFF",
        "#AE10EFFF",
        "#EF4E12FF",
        "#F8D71BFF"
    ];

    inventorySprite = null;
    name = "Unspecifed Item";
    nameFill = "#FFFFFFFF";
    nameStroke = "#000000FF";
    description ="This item does not exist and you're seeing it due to a bug.";
    grade = 0;
    slot = EQUIP_NONE;
    stats = [];
    level = 0;
    socketCount=0;
    socketItems = [];

    static fromTemplate(tpl)
    {
        let result = new InventoryItem();
        result.inventorySprite = GraphicsData.get(tpl.sprite);
        result.name = tpl.name;
        result.description = tpl.description;
        
        result.grade = tpl.grade??0;
        result.level = tpl.level??0;
        result.slot = tpl.slot??0;
        result.socketCount = tpl.sockets??0;

        result.nameFill = InventoryItem.ColourGrades[result.grade];

        return result;
    }
}
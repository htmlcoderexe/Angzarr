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
    type ="item";
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
    maxStack = 1;
    count = 1;

    canStackWith(other)
    {
        return this.type==other.type;
    }

    static stack(a,b)
    {
        if(!a.canStackWith(b))
        {
            return [a,b];
        }
        let total = a.count+b.count;
        let leftover = total-a.maxStack;
        if(leftover<=0)
        {
            a.count=total;
            return [a,null];
        }
        a.count=a.maxStack;
        b.count=leftover;
        return [a,b];
    }

    static fromTemplate(tpl)
    {
        let result = new InventoryItem();
        // mandatory properties from template
        result.inventorySprite = GraphicsData.get(tpl.sprite);
        result.name = tpl.name;
        result.description = tpl.description;
        result.type = tpl.type;
        
        // optional properties from template
        result.grade = tpl.grade??0;
        result.level = tpl.level??0;
        result.slot = tpl.slot??0;
        result.socketCount = tpl.sockets??0;
        result.maxStack = tpl.stack??1;

        // computed properties
        result.nameFill = InventoryItem.ColourGrades[result.grade];

        return result;
    }
}
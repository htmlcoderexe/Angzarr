const STAT_BASE = 0;
const STAT_EQUIP = 1;
const STAT_EFFECT = 2;

const STAT_LAST = STAT_EFFECT+1;
class StatEntry
{
    stat="";
    multiplier=1;
    flat=0;
    level = STAT_BASE;
    constructor(statname,flat=0,m=1,level=STAT_BASE)
    {
        this.stat=statname;
        this.multiplier=m;
        this.flat=flat;
        this.level=level;
    }
}
class StatBlock
{
    statEntries = [];
    constructor()
    {
        let basics = [
            new StatEntry("HP",10),
            new StatEntry("MainDMG",4),
            new StatEntry("MainROF",300)
        ];
        this.statEntries.push(...basics);
    }
    calculateLevel(statname, level, basevalue = 0)
    {
        let list = this.statEntries.filter((e)=>e.stat==statname && e.level ==level);
        let m = 1;
        let f = basevalue;
        list.forEach((e)=>{
            m*=e.multiplier;
            f+=e.flat;
        });
        return f*m;
    }
    calculateStat(statname)
    {
        let value=0;
        for(let i = 0;i<STAT_LAST;i++)
        {
            value = this.calculateLevel(statname,i,value);
        }
        return value;
    }
    add(entry)
    {
        this.statEntries.push(entry);
    }
    remove(entry)
    {
        this.statEntries=this.statEntries.filter((e)=>e!=entry);
    }
}
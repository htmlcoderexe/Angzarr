class RNGesus
{
    static die(sides)
    {
        return Math.ceil(Math.random()*sides);
    }
    static roll(roll_spec)
    {
        let count = 1;
        let sides = 0;
        let offset = 0;
        let current = "";
        let mode = "count";
        let negative=false;
        for(let i=0;i<roll_spec.length;i++)
        {
            let c = roll_spec[i];
            if(c>='0' && c<='9')
            {
                current+=c;
            }
            else
            {
                if(mode == "count" && c=="d")
                {
                    count = current==""?1:parseInt(current);
                    current ="";
                    mode="sides";
                    continue;
                }
                if(mode=="sides" && (c=="-" || c=="+"))
                {
                    sides = current==""?0:parseInt(current);
                    current ="";
                    mode="offset";
                    if(c=="-")
                    {
                        negative=true;
                    }
                    continue;
                }
                console.warn("Invalid dice roll spec (unknown char '"+c+"' at "+i+"): \""+roll_spec+"\"");
                return 0;
            }
        }
        switch(mode)
        {
            case "count":
            {
                count = current==""?1:parseInt(current);
                break;
            }
            case "sides":
            {
                sides = current==""?1:parseInt(current);
                break;
            }
            case "offset":
            {
                offset = current==""?1:parseInt(current);
                break;
            }
        }
        if(negative)
        {
            offset*=-1;
        }
        if(sides==0)
        {
            console.warn("Invalid dice roll spec (0 sides): \""+roll_spec+"\"");
            return 0;
        }
        let result = 0;
        console.log("Rolling <"+roll_spec+">, "+count+" "+sides+"-sided dice"+(offset==0?"": " offset by "+offset)+".")
        for(let i=0;i<count;i++)
        {
            result+=this.die(sides);
        }
        result+=offset;
        return result;
    }
}
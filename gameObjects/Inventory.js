class Inventory 
{
    items = [];
    overflow = [];
    capacity = 1;
    undoStack = [];
    constructor(size)
    {
        this.capacity=size;
        this.items = new Array(size);
    }
    get isFull() {
        return this.items.length>=this.capacity;
    }
    get currentUndoStack() {
        if(this.undoStack.length==0)
            this.beginUndoStack();
        return this.undoStack[this.undoStack.length-1];
    }
    checkFit(item)
    {

    }
    clearUndoStack()
    {
        this.undoStack.pop();
    }
    beginUndoStack()
    {
        this.undoStack.push([]);
    }
    addUndo(pos, count)
    {
        this.currentUndoStack.push([pos,count]);
    }
    rollBackUndoStack()
    {
        let stack = this.undoStack.pop();
        while(stack.length>0)
        {
            let tx = stack.pop();
            if(tx[1]==0)
            {
                this.items[tx[0]]=null;
            }
            else
            {
                this.items[tx[0]].count = tx[1];
            }
            
        }
    }
    rollbackAll()
    {
        while(this.undoStack.length>0)
        {
            this.rollBackUndoStack();
        }
    }
    addItems(items,overflow=false)
    {
        let fail=false;
        items.every((item)=>{
            fail = !this.add(item,overflow);
            return !fail;
        });
        if(fail)
        {
            this.rollbackAll();
            return false;
        }
        return true;

    }
    add(item, overflow=false)
    {
        // for now
        this.beginUndoStack();
        for(let i=0;i<this.items.length;i++)
        {
            let current = this.items[i];
            if(!current)
                continue;
            console.log(current);
            let [a,b] = InventoryItem.stack(this.items[i],item);
            this.addUndo(i,this.items[i].count);
            this.items[i]=a;
            // if stacked with no leftovers, we're done
            if(!b)
            {
                return true;
            }
            // carry over the leftovers
            item = b;
        }
        // whole inventory iterated for stack possibilities
        // still have leftovers/item to stack
        for(let i=0;i<this.items.length;i++)
        {
            // find an empty slot, put item there
            if(!this.items[i])
            {
                this.addUndo(i,0);
                this.items[i]=item;
                return true;
            }
        }
        if(!overflow)
        {
            // FUCK GO BACK
            this.rollBackUndoStack();
            return false;
        }
        this.overflow.push(item);
        return true;
    }
    remove(item, quantity=0)
    {

    }
    *[Symbol.iterator]() {
        for(const item of this.items)
        {
            yield item;
        }
    }
}
class Rectangle
{
    x = 0;
    y = 0;
    width = 1;
    height = 1;
    constructor(x,y,w,h)
    {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    testPoint(x,y)
    {
        return this.x <= x 
			&& this.x + this.width > x 
			&& this.y <= y 
			&& this.y + this.height > y;
    }
    testRect(rect)
    {
        return this.x <= rect.x + rect.width 
            && this.x + this.width > rect.x
            && this.y <= rect.y + rect.height
            && this.y + this.height > rect.y;
    }
}
/**
 * Represents a rectangle for drawing and collision testing
 */
class Rectangle
{
    /**
     * X coordinate of the top-left corner
     */
    x = 0;
    /**
     * Y coordinate of the top-left corner
     */
    y = 0;
    /**
     * Rectangle width
     */
    width = 1;
    /**
     * Rectangle height
     */
    height = 1;
    /**
     * Creates a new rectangle given origin corner and dimensions
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     */
    constructor(x,y,w,h)
    {
        // normalise the rectangle to ensure widht and height are positive
        // this is needed for collision tests
        if(w<0)
        {
            w*=-1;
            x-=w;
        }
        if(h<0)
        {
            h*=-1;
            y-=h;
        }
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    /**
     * Checks if a point is inside the rectangle.
     * @param {number} x 
     * @param {number} y 
     * @returns true if point inside Rectangle false otherwise
     */
    testPoint(x,y)
    {
        return this.x <= x 
			&& this.x + this.width > x 
			&& this.y <= y 
			&& this.y + this.height > y;
    }
    /**
     * Checks if this rectangle overlaps another rectangle
     * @param {Rectangle} rect - the other Rectangle
     * @returns true if the Rectangles overlap false otherwise
     */
    testRect(rect)
    {
        return this.x <= rect.x + rect.width 
            && this.x + this.width > rect.x
            && this.y <= rect.y + rect.height
            && this.y + this.height > rect.y;
    }
}
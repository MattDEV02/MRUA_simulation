class Point {
   
   constructor(x, y, diameter, color) {
      this.x = x;
      this.y = y;
      if (diameter > 0) {
         this.diameter = diameter;
         this.color = color;
         stroke(0); // black
         fill(this.color);
         ellipse(this.x, this.y, this.diameter, this.diameter);
      }
   }

   toString = () => `(${this.x}, ${this.y})`;

   equals = p2 => Math.round(this.x) === Math.round(p2.x) && Math.round(this.y) === Math.round(p2.y);

   static distance = (p1, p2) => Math.sqrt(
      Math.pow((p2.x - p1.x), 2) +
      Math.pow((p2.y - p1.y), 2)
   ).toFixed(3);

   isOutFromCanvas = pM => (this.x > pM.x || this.x < 0 || this.y < 0 || this.y > pM.y);

   isArrived = pF => (this.x >= pF.x && this.y <= pF.y);
}

class Line {
   
   constructor(p1, p2, color) {
      this.p1 = p1;
      this.p2 = p2;
      this.color = color;
      stroke(this.color); 
      line(p1.x, p1.y, p2.x, p2.y);
   }

   length = () => Point.distance(this.p1, this.p2);
}

const toKMH = value => (value * 3.6).toFixed(2); // v:  m/s ==> km/h

const
   xM = 550,
   yM = 550,
   x10 = 20,
   y10 = 530,
   x20 = 20,
   y20 = 450,
   d1F = 500,
   d2F = 150,
   v10 = 0,
   v20 = 34.64,
   a1 = 30.04,
   a2 = 0,
   ts = 0, // t star
   moveName = "MRUA",
   diameter = 5; // MRUA

const
   x1F = x10 + d1F,
   y1F = y10 - d1F,
   x2F = x20 + d2F,
   y2F = y20 - d2F,
   p0 = new Point(0, 0);

let
   pM = null,
   p10 = null,
   p1F = null,
   p20 = null,
   p2F = null,
   t0 = 0,
   t = 0,
   dt = 0, // delta t = t - t0
   v1 = v10,
   v2 = v20,
   x1 = x10,
   y1 = y10,
   p1 = null,
   x2 = x20,
   y2 = y20,
   p2 = null,
   ds1 = 0,
   ds2 = 0,
   d1 = 0, // total distance
   d2 = 0, // total distance
   vTot1 = v10, // media velocity
   vTot2 = v20, // media velocity
   vMe1 = 0, // media velocity
   vMe2 = 0, // media velocity
   i1 = 1, // number of v
   i2 = 1, // number of v
   xS = 0,
   yS = 0,
   pS = null,
   tS = 0,
   collision = false,
   p1Finish = false,
   p2Finish = false,
   start = null;

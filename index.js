class Point {

   static color = 0; // RGB

   constructor(x, y, dim) {
      this.x = x;
      this.y = y;
      if (dim > 0) {
         this.dim = dim;
         ellipse(this.x, this.y, this.dim, this.dim);
         fill(Point.color);
      }
   }

   toString = () => `(${this.x}, ${this.y})`;

   static distance = (p1, p2) => Math.sqrt(
      Math.pow((p2.x - p1.x), 2) +
      Math.pow((p2.y - p1.y), 2)
   ).toFixed(3);

   isOutFromCanvas = pM => (this.x > pM.x || this.x < 0 || this.y < 0 || this.y > pM.y);

   isArrived = pF => (this.x >= pF.x && this.y <= pF.y);
}

const toKMH = value => (value * 3.6).toFixed(2); // v:  m/s ==> km/h

const
   xM = 650,
   yM = 550,
   x0 = 0,
   y0 = 550,
   dF = 540,
   v0 = 0,
   moveName = "MRUA",
   dim = 5,
   a = 30; // MRUA

const
   xF = x0 + dF,
   yF = y0 - dF;

let
   pM = null,
   p0 = null,
   pF = null,
   t0 = 0,
   t = 0,
   dt = 0, // delta t = t - t0
   v = v0,
   x = x0,
   y = y0,
   p = null,
   ds = 0,
   d = 0, // total distance
   vMe = v0, // media velocity
   i = 1, // number of v
   start = null;

function setup() {
   pM = new Point(xM, yM);
   p0 = new Point(x0, y0);
   pF = new Point(xF, yF);
   createCanvas(pM.x, pM.y);
   console.log(`${moveName}: v0 = ${v0} m/s, a = ${a} m/s^2, t0 = ${0} s, s0 = ${p0.toString()} => ${Point.distance(new Point(0, yM), p0)} m.`);
   start = new Date();
   t0 = start.getMilliseconds() / 1000;
}

function draw() { // loop
   background(255);
   p = new Point(x, y, dim);
   d = Point.distance(p0, p);
   t = (new Date() - start) / 1000;
   dt = Math.abs(t - t0);
   v = v0 + (a * dt);
   ds = ((1 / 2) * a * Math.pow(dt, 2)) + (v0 * dt);
   x = p0.x + ds;
   y = p0.y - ds;
   console.log(`{ x(${dt.toFixed(3)}) = ${p.x.toFixed(3)} , y(${dt.toFixed(3)}) = ${p.y.toFixed(3)} } ; s(${dt.toFixed(3)}) = ${d} m ; v(${dt.toFixed(3)}) = ${v} m/s = ${toKMH(v)} km/h con a = ${a} m/s^2`);
   vMe += v;
   i++;
   if (p.isArrived(pF) || p.isOutFromCanvas(pM)) {
      noLoop();
      vMe /= i;
      console.log(`\nIl corpo ha terminato il suo moto ${moveName} in tF = ${dt} s con: s(tF) = ${d} m, { ${p0.toString()} ==> ${pF.toString()} }, v(tF) = ${v} m/s = ${toKMH(v)} km/h, con a = ${a} m/s^2 ; vMe = ${vMe} m/s = ${toKMH(vMe)} km/h\n`);
      line(p0.x, p0.y, pF.x, pF.y);
   }
}
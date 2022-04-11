function setup() {
   pM = new Point(xM, yM);
   p10 = new Point(x10, y10);
   p20 = new Point(x20, y20);
   p1F = new Point(x1F, y1F);
   p2F = new Point(x2F, y2F);
   createCanvas(pM.x, pM.y);
   console.log(`${moveName}: v10 = ${v10} m/s, a1 = ${a1} m/s^2, t10 = ${t0} s, s10 = ${p10.toString()} => ${Point.distance(new Point(0, yM), p10)} m.`);
   console.log(`${moveName}: v20 = ${v20} m/s, a2 = ${a2} m/s^2, t20 = ${t0} s, s20 = ${p20.toString()} => ${Point.distance(new Point(0, yM), p20)} m.`);
   start = new Date();
   t0 = start.getMilliseconds() / 1000;
}

function draw() { // loop
   background(255);
   p1 = new Point(x1, y1, diameter, "blue");
   p2 = new Point(x2, y2, diameter, "red");
   d1 = Point.distance(p10, p1);
   d2 = Point.distance(p20, p2);
   t = (new Date() - start) / 1000;
   dt = Math.abs(t - t0);
   v1 = v10 + (a1 * dt);
   v2 = v20 + (a2 * dt);
   ds1 = ((1 / 2) * a1 * Math.pow(dt, 2)) + (v10 * dt);
   ds2 = ((1 / 2) * a2 * Math.pow(dt, 2)) + (v20 * dt);
   x1 = p10.x + ds1;
   y1 = p10.y - ds1;
   x2 = p20.x + ds2;
   //y2 = p20.y - ds2;
   console.log(`{ x1(${dt.toFixed(4)}) = ${p1.x.toFixed(3)} , y1(${dt.toFixed(4)}) = ${p1.y.toFixed(3)} } ; s(${dt.toFixed(3)}) = ${d1} m ; v(${dt.toFixed(3)}) = ${v1.toFixed(3)} m/s = ${toKMH(v1)} km/h con a1 = ${a1} m/s^2`);
   console.log(`{ x2(${dt.toFixed(4)}) = ${p2.x.toFixed(3)} , y2(${dt.toFixed(4)}) = ${p2.y.toFixed(3)} } ; s(${dt.toFixed(3)}) = ${d2} m ; v(${dt.toFixed(3)}) = ${v2.toFixed(3)} m/s = ${toKMH(v2)} km/h con a2 = ${a2} m/s^2`);
   vMe1 += v1;
   i1++;
   vMe2 += v2;
   i2++;
   if (p1.equals(p2)) {
      ss = dt;
      collision = true;
      xS = x2,
      yS = y2;
   }
   if (p1.isArrived(p1F) || p1.isOutFromCanvas(pM) || p2.isArrived(p2F) || p1.isOutFromCanvas(pM)) {
      noLoop();
      vMe1 /= i1;
      vMe2 /= i2;
      console.log(`${moveName} p1: tF = ${dt.toFixed(5)} s con: s1(tF) = ${d1} m, { ${p10.toString()} ==> ${p1F.toString()} }, v1(tF) = ${v1.toFixed(3)} m/s = ${toKMH(v1)} km/h, con a1 = ${a1} m/s^2 ; vMe1 = ${vMe1.toFixed(3)} m/s = ${toKMH(vMe1)} km/h`);
      console.log(`${moveName} p2: tF = ${dt.toFixed(5)} s con: s2(tF) = ${d2} m, { ${p20.toString()} ==> ${p2F.toString()} }, v2(tF) = ${v2.toFixed(3)} m/s = ${toKMH(v2)} km/h, con a2 = ${a2} m/s^2 ; vMe2 = ${vMe2.toFixed(3)} m/s = ${toKMH(vMe2)} km/h`);
      stroke(p1.color);
      line(p10.x, p10.y, p1F.x, p1F.y);
      stroke(p2.color);
      line(p20.x, p20.y, p2.x, p2.y);
      if(collision) {
         new Point(xS, yS, diameter, 0);
         console.warn(`Scontro: t* = ${ss.toFixed(5)} s ==> { x(${ss.toFixed(5)}) = ${Math.round(x2)}, y(${ss.toFixed(5)}) = ${Math.round(y2)} }`);
      }
   }
}
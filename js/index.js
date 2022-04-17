function setup() {
   pM = new Point(xM, yM);
   p10 = new Point(x10, y10);
   p20 = new Point(x20, y20);
   p1F = new Point(x1F, y1F);
   p2F = new Point(x2F, y2F);
   createCanvas(pM.x, pM.y);
   window.alert(`MRUA: v10 = ${v10} m/s, a1 = ${a1} m/s^2, t10 = ${t10} s, s10 = ${p10.toString()} => ${Point.distance(p0, p10, yM)} m.\n \nMRU: v20 = ${v20} m/s, a2 = ${a2} m/s^2, t20 = ${t20} s, s20 = ${p20.toString()} => ${Point.distance(p0, p20, yM)} m.`);
   start = new Date();
   tStart = start.getMilliseconds() / 1000;
}

function draw() { // loop
   background("#FFFFFF");
   p1 = new Point(x1, y1, diameter, "#0000FF");
   p2 = new Point(x2, y2, diameter, "#FF0000");
   d1 = Point.distance(p10, p1, yM);
   d2 = Point.distance(p20, p2, yM);
   t = ((new Date() - start) / 1000);
   dt = Math.abs((t - tStart));
   if (!(p1.isArrived(p1F) || p1.isOutFromCanvas(pM)) && dt >= t10) {
      v1 = v10 + (a1 * (dt - t10));
      ds1 = ((1 / 2) * a1 * Math.pow(dt, 2)) + (v10 * (dt - t10));
      x1 = p10.x + ds1;
      y1 = p10.y - ds1;
      vTot1 += v1;
      i1++;
   } else
      p1Finish = true;
   if (!(p2.isArrived(p2F) || p2.isOutFromCanvas(pM)) && dt >= t20) {
      v2 = v20 + (a2 * (dt - t20));
      ds2 = ((1 / 2) * a2 * Math.pow(dt, 2)) + (v20 * (dt - t20));
      x2 = p20.x + ds2;
      //y2 = p20.y - ds2;
      vTot2 += v2;
      i2++;
   } else
      p2Finish = true;
   console.log(`{ x1(${dt.toFixed(4)}) = ${p1.x.toFixed(3)} , y1(${dt.toFixed(4)}) = ${p1.y.toFixed(3)} } ; s(${dt.toFixed(3)}) = ${d1} m ; v(${dt.toFixed(3)}) = ${v1.toFixed(3)} m/s = ${toKMH(v1)} km/h con a1 = ${a1} m/s^2`);
   console.log(`{ x2(${dt.toFixed(4)}) = ${p2.x.toFixed(3)} , y2(${dt.toFixed(4)}) = ${p2.y.toFixed(3)} } ; s(${dt.toFixed(3)}) = ${d2} m ; v(${dt.toFixed(3)}) = ${v2.toFixed(3)} m/s = ${toKMH(v2)} km/h con a2 = ${a2} m/s^2`);
   if (p1.equals(p2)) {
      tS = dt;
      collision = true;
      xS = x2;
      yS = y2;
   }
   if (p1Finish && p2Finish) {
      noLoop();
      vMe1 = vTot1 / i1;
      vMe2 = vTot2 / i2;
      console.log(`MRUA p1: tF = ${dt.toFixed(5)} s con: s1(tF) = ${d1} m, { ${p10.toString()} ==> ${p1F.toString()} }, v1(tF) = ${v1.toFixed(3)} m/s = ${toKMH(v1)} km/h, con a1 = ${a1} m/s^2 ; vMe1 = ${vMe1.toFixed(3)} m/s = ${toKMH(vMe1)} km/h`);
      console.log(`MRU p2: tF = ${dt.toFixed(5)} s con: s2(tF) = ${d2} m, { ${p20.toString()} ==> ${p2F.toString()} }, v2(tF) = ${v2.toFixed(3)} m/s = ${toKMH(v2)} km/h, con a2 = ${a2} m/s^2 ; vMe2 = ${vMe2.toFixed(3)} m/s = ${toKMH(vMe2)} km/h`);
      new Line(p10, p1, p1.color);
      new Line(p20, p2, p2.color);
      if (collision) {
         pS = new Point(xS, yS, diameter, black);
         new Line(new Point(0, pS.y), pS, black);
         new Line(new Point(pS.x, yM), pS, black);
         console.log(`Scontro: t* = ${tS.toFixed(5)} s ==> { x(${tS.toFixed(5)}) = ${Math.round(x2)}, y(${tS.toFixed(5)}) = ${Math.round(y2)} } ==> ${Point.distance(p0, pS, yM)} m`);
      }
   }
}

function mousePressed() {
   noLoop();
}

function mouseReleased() {
   loop();
}
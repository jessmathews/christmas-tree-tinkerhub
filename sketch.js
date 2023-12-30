const snowflakes = [];
const ground = [];

function setup() {
  createCanvas(500, 500);
  noSmooth();
  for (let i = 0; i < 100; i++) {
    snowflakes.push(createVector(random(width), random(height), 1));
  }

  for (let x = 0; x < width; x++) {
    ground[x] = height;
  }
}

function draw() {
  background(0, 0, 32);
  stroke(255);
  fill(255);

  for (const snowflake of snowflakes) {
    snowflake.y += snowflake.z;

    rect(snowflake.x, snowflake.y, 1, 1);

    if (snowflake.y >= ground[floor(snowflake.x)]) {
      ground[floor(snowflake.x)]--;

      snowflake.x = random(width);
      snowflake.y = 0;
    }
  }

  for (let x = 0; x < width; x++) {
    rect(x, ground[x], 1, height - ground[x]);
  }
  drawTree();
}
function drawTree() {
  stroke(139, 69, 19);
  fill(139, 69, 19);
  rect(width / 2 - 10, height / 2 + 200, 20, 50);
  var y = 110;
  for (let i = 0; i < 4; i++) {
    drawSection(200, y);
    y = y - 50;
  }
  fill(255, 223, 0);
  star(width / 2, 70, 5, 25, 6);
  for (let i = 50; i < 350; i += 50) {
    for (let j = width / 2 - i / 2 + 7; j < width / 2 + i / 2 + 7; j += 15) {
      drawLight(j, height / 2 + i - 100);
    }
  }
}
function drawSection(offsetX, offsetY) {
  for (let y = 100; y < 340; y++) {
    let inter = map(y, 100, 340, 0, 1);
    let c = lerpColor(color(0, 100, 0), color(0, 200, 0), inter);
    fill(c);
    noStroke();

    // Adjust the x-coordinates to move the triangle horizontally
    let x1 = 50 - 0.8 * (y - 100) + offsetX;
    let x2 = 50 + 0.8 * (y - 100) + offsetX;
    let y1 = y + offsetY;
    let y2 = 340 + offsetY;

    triangle(50 + offsetX, y1, x1, y2, x2, y2);
  }
}
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
function drawLight(x, y) {
  fill(random(255), random(255), random(255));
  ellipse(x, y, 5, 10);
}

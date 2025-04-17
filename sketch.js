// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//nice reference - https://www.youtube.com/watch?v=W24xhB9PO54
let cube = {
  front,
  back,
  left,
  right,
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(7);
}

function draw() {
  background("black");
  if (mouseIsPressed){
    rotateX(mouseX);
    rotateY(mouseY);
  }
  box(200, 200, 200);
}

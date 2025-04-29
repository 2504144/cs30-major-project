// Rubiks Cube Similator
// Khoi Tran
// April 29th, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//nice reference - https://www.youtube.com/watch?v=W24xhB9PO54

class Box{
  constructor(x, y, z, sideLength, color){
    this.sideLength = 20;
    this.x = x * sideLength;
    this.y = y * sideLength;
    this.z = z * sideLength;
    this.color = color;
  }

  display(){
    fill(this.color);
    stroke(0);
    strokeWeight(8);
    applyMatrix();
    translate(this.x, this.y, this.z);
    cube(this.sideLength);
    resetMatrix();
  }
};

let dimensions = 3;
let boxes = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  orbitControl();
  let cube = new Box(dimensions,dimensions, dimensions);

  for(let i = 0; i < dimensions; i++){
    for(let j = 0; j < dimensions; j++){
      for(let k = 0; k < dimensions; k++){
        let sideLength = 20;
        let x = sideLength * i;
        let y = sideLength * j;
        let z = sideLength * k;
        cube[[i][j][k]] = new Box(x, y, z, sideLength);

      }
    }
  }
}

function draw() {
  background("black");

  for(let i = 0; i < dimensions; i++){
    for(let j = 0; j < dimensions; j++){
      for(let k = 0; k < dimensions; k++){
        cube[i][j][k].display();

      }
    }
  }
}

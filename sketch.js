// Rubiks Cube Similator
// Khoi Tran
// April 29th, 2025
//
// Extra for Experts:
// - I learnt about 3D arrays


//nice reference - https://www.youtube.com/watch?v=W24xhB9PO54

class Box{
  constructor(x, y, z, sideLength){
    this.sideLength = sideLength;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  display(){
    push();
    //changing origin
    translate(this.x, this.y, this.z);

    stroke(0);
    strokeWeight(1);
    box(this.sideLength);
    pop();
  }
};

let boxes = [];
let sideLength = 75;
let dimensions = 3;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  //3 by 3 grid
  for(let i = 0; i < dimensions; i++){
    for(let j = 0; j < dimensions; j++){
      for(let k = 0; k < dimensions; k++){
        
        //centering cube
        let x = i * sideLength - sideLength;
        let y = j * sideLength - sideLength;
        let z = k * sideLength - sideLength;

        boxes.push (new Box(x, y, z, sideLength));
      }
    }
  }
}

function draw() {
  background("black");

  rotateX(mouseY * - 0.01);
  rotateY(mouseX * - 0.01);

  for(let box of boxes){
    box.display();
  }
}
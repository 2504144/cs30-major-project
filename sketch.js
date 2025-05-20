// Rubiks Cube Similator
// Khoi Tran
// April 29th, 2025
//
// Extra for Experts:
// - I learnt about 3D arrays
// - Used orbitControl function added it to set up first but it does work in draw function


//nice reference - https://www.youtube.com/watch?v=W24xhB9PO54

//colors
let color = new Map();
color.set("front", "white");
color.set("back", "yellow");
color.set("right", "blue");
color.set("left", "green");
color.set("up", "red");
color.set("down", "orange");


let boxes = [];
let sideLength = 75;
let dimensions = 3;
let r = sideLength / 2;
let highlight = true;

class Box{
  constructor(x, y, z, sideLength, i, j, k){
    this.sideLength = sideLength;
    this.x = x;
    this.y = y;
    this.z = z;
    this.i = i;
    this.j = j;
    this.k = k;
    this.angleX = 0;
    this.angleY = 0;
    this.angleZ = 0;
  }

  display(){
    push();

    //changing origin
    translate(this.x, this.y, this.z);

    //rotation
    rotateX(this.angleX);
    rotateY(this.angleY);
    rotateZ(this.angleZ);

    fill("white");
    stroke(1);
    strokeWeight(5);
    //box(this.sideLength);
    
    //creating custom cube with beginShape function "adding color"
    beginShape(QUADS);

    // 4 |||| faces

    //z-axis

    //add color

    fill(color.get("front"));
    //setting coordinate for each tile
    vertex(-r, -r, r);
    vertex(r, -r, r);
    vertex(r, r, r);
    vertex(-r, r, r);

    fill(color.get("back"));
    vertex(-r, -r, -r);
    vertex(r, -r, -r);
    vertex(r, r, -r);
    vertex(-r, r, -r);

    //y-axis
    fill(color.get("up"));
    vertex(-r, -r, -r);
    vertex(r, -r, -r);
    vertex(r, -r, r);
    vertex(-r, -r, r);

    fill(color.get("down"));
    vertex(-r, r, r);
    vertex(r, r, r); 
    vertex(r, r, -r);
    vertex(-r, r, -r);

    //x-axis
    fill(color.get("right"));
    vertex(-r, -r, -r);
    vertex(-r, r, -r);
    vertex(-r, r, r);
    vertex(-r, -r, r);
    
    fill(color.get("left"));
    vertex(r, -r, -r);
    vertex(r, r, -r);
    vertex(r, r, r);
    vertex(r, -r, r);

    endShape();
    pop();
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  //3D array
  for(let i = 0; i < dimensions; i++){
    for(let j = 0; j < dimensions; j++){
      for(let k = 0; k < dimensions; k++){
        
        //centering cubes
        let x = i * sideLength - sideLength;
        let y = j * sideLength - sideLength;
        let z = k * sideLength - sideLength;
        
        boxes.push (new Box(x, y, z, sideLength, i, j, k));
      }
    }
  }
}

function draw() {

  background(255, 255, 204);//color code - #FFFFCC

  addCubes();
  //selection();
}

//window resizing
function windowResize(){
  resizeCanvas(windowWidth, windowHeight);
}

function addCubes(){

  //able to move while mouse dragged
  orbitControl(2, 2, 2);

  for(let box of boxes){
    box.display();
  }


}

//keys and rotations(rubic notations)
//https://jperm.net/3x3/moves - notations
function keyPressed(){

  //x
  if (key === "x"){
    for (let b of boxes){
      if (b.i === 1){
        b.angleX += HALF_PI;
      }
    }
  }

  //y
  if (key === "y"){
    
    //goes through the grid of cubes
    for (let b of boxes){
      if (b.j === 1){

        //half_pi 90 degrees
        b.angleY += HALF_PI;
      }
    }
  }
  // z
  if (key === "z"){
    for (let b of boxes){
      if (b.k === 1){
        b.angleZ += HALF_PI;
      }
    }
  }

  // u
  if (key === "u"){
    for (let b of boxes){
      if (b.j === 0){
        b.angleY += HALF_PI;
      }
    }
  }

  //r
  if (key === "r"){
    for (let b of boxes){
      if (b.j === 0){
        b.angleY -= HALF_PI;
      }
    }
  }

  //d
  if (key === "d"){
    for (let b of boxes){
      if (b.k === 2){
        b.angleZ += HALF_PI;
      }
    }
  }

  //l
  if (key === "l"){
    for (let b of boxes){
      if (b.j === 2){
        b.angleY += HALF_PI;
      }
    }
  }

  //f
  if (key === "f"){
    for (let b of boxes){
      if (b.i === 0){
        b.angleX -= HALF_PI;
      }
    }
  }

  //b
  if (key === "b"){
    for (let b of boxes){
      if (b.i === 2){
        b.angleX += HALF_PI;
      }
    }
  }
  
  //oppisite turn use capitalised

  //X
  if (key === "X"){
    for (let b of boxes){
      if (b.i === 1){
        b.angleX -= HALF_PI;
      }
    }
  }

  // Y
  if (key === "Y"){
    for (let b of boxes){
      if (b.j === 1){
        b.angleY -= HALF_PI;
      }
    }
  }

  //Z
  if (key === "Z"){
    for (let b of boxes){
      if (b.k === 1){
        b.angleZ -= HALF_PI;
      }
    }
  }

  // U
  if (key === "U"){
    for (let b of boxes){
      if (b.j === 0){
        b.angleY -= HALF_PI;
      }
    }
  }

  //R
  if (key === "R"){
    for (let b of boxes){
      if (b.j === 0){
        b.angleY += HALF_PI;
      }
    }
  }

  //D
  if (key === "D"){
    for (let b of boxes){
      if (b.k === 2){
        b.angleZ -= HALF_PI;
      }
    }
  }

  //L
  if (key === "L"){
    for (let b of boxes){
      if (b.j === 2){
        b.angleY -= HALF_PI;
      }
    }
  }
  //f
  if (key === "F"){
    for (let b of boxes){
      if (b.i === 0){
        b.angleX += HALF_PI;
      }
    }
  }

  //B
  if (key === "B"){
    for (let b of boxes){
      if (b.i === 2){
        b.angleX -= HALF_PI;
      }
    }
  }
}
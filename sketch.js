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

class Box{
  constructor(x, y, z, sideLength){
    this.sideLength = sideLength;
    this.x = x;
    this.y = y;
    this.z = z;
    
    //let the faces have there own numbers
    this.face = [
      new Face(createVector(0,0,1), color.get("front")),
      new Face(createVector(0,0,-1), color.get("back")),
      new Face(createVector(0,-1,0), color.get("up")),
      new Face(createVector(0,1,0), color.get("down")), 
      new Face(createVector(1,0,0), color.get("right")), 
      new Face(createVector(-1,0,0), color.get("left")),
    ];
  }

  display(){
    push();

    //changing origin
    translate(this.x, this.y, this.z);

    stroke(1);
    strokeWeight(5);
    //box(this.sideLength);
    
    //creating custom cube with beginShape function "adding color"
    //beginShape(QUADS);

    // 4 |||| faces

    for (let f of this.face){
      f.show();
    }
    // //z-axis

    // //add color

    // fill(color.get("front"));
    // //setting coordinate for each tile
    // vertex(-r, -r, r);
    // vertex(r, -r, r);
    // vertex(r, r, r);
    // vertex(-r, r, r);

    // fill(color.get("back"));
    // vertex(-r, -r, -r);
    // vertex(r, -r, -r);
    // vertex(r, r, -r);
    // vertex(-r, r, -r);

    // //y-axis
    // fill(color.get("up"));
    // vertex(-r, -r, -r);
    // vertex(r, -r, -r);
    // vertex(r, -r, r);
    // vertex(-r, -r, r);

    // fill(color.get("down"));
    // vertex(-r, r, r);
    // vertex(r, r, r); 
    // vertex(r, r, -r);
    // vertex(-r, r, -r);

    // //x-axis
    // fill(color.get("right"));
    // vertex(-r, -r, -r);
    // vertex(-r, r, -r);
    // vertex(-r, r, r);
    // vertex(-r, -r, r);
    
    // fill(color.get("left"));
    // vertex(r, -r, -r);
    // vertex(r, r, -r);
    // vertex(r, r, r);
    // vertex(r, -r, r);

    // endShape();
    pop();
  }

  //rotation
  turnX(){
    for (let f of this.face){
      f.turnX(HALF_PI/2);
    }
  }
  turnY(){
    for (let f of this.face){
      f.turnY(HALF_PI/2);
    }
  }
  turnZ(){
    for (let f of this.face){
      f.turnZ(HALF_PI/2);
    }
  }
};

class Face{
  constructor(v, c){

    //postion
    this.v = v;

    //colour
    this.c = c;
  }

  show(){
    push();
    fill(this.c);
    rectMode(CENTER);

    //making middle of each cube origin
    translate(this.v.x * sideLength/2, this.v.y * sideLength/2, this.v.z * sideLength/2);

    //placement
    if(this.v.x > 0){
      rotateY(-HALF_PI);
    }
    else if(this.v.x < 0){
      rotateY(HALF_PI);
    }
    else if(this.v.y > 0){
      rotateX(-HALF_PI);
    }
    else if(this.v.y < 0){
      rotateX(HALF_PI);
    }
    else if(this.v.z < 0){
      rotateY(PI);
    }
    square(0, 0, sideLength);

    pop();
  }

  //rotation
  turnX(angle){
    //current X
    let x = this.v.x;

    //rotate face around X axis
    let y = round(this.v.y * cos(angle) - this.v.z * sin(angle));
    let z = round(this.v.y * sin(angle) + this.v.z * cos(angle));

    //update positions of colours
    this.v = createVector(x, y, z);
  }

  turnY(angle){
    let y = this.v.y;
    let x = round(this.v.x * cos(angle) - this.v.z * sin(angle));
    let z = round(this.v.x * sin(angle) + this.v.z * cos(angle));
    this.v = createVector(x, y, z);
  }

  turnZ(angle){
    let z = this.v.z;
    let x = round(this.v.x * cos(angle) - this.v.y * sin(angle));
    let y = round(this.v.x * sin(angle) + this.v.y * cos(angle));
    this.v = createVector(x, y, z);
  }
}

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
        
        boxes.push (new Box(x, y, z, sideLength));
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
    for (let box of boxes){
      if (box.x === sideLength){
        box.turnX();
      }
    }
  }
  if (key === "X"){
    for (let box of boxes){
      if (box.x === sideLength){
        box.turnX(-HALF_PI);
      }
    }
  }

  //y
  if (key === "y"){
    for (let box of boxes){
      if (box.y === 0){
        box.turnY();
      }
    }
  }

  //z
  if (key === "z"){
    for (let box of boxes){
      if (box.z === 0){
        box.turnZ();
      }
    }
  }
}
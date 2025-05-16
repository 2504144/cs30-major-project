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
    this.angle = 0;
  }

  display(){
    push();

    //changing origin
    translate(this.x, this.y, this.z);

    //rotation
    rotateY(this.angle);

    fill("white");
    stroke(1);
    strokeWeight(5);
    //box(this.sideLength);
    
    //creating custom cube with beginShape function "adding color"
    beginShape(QUADS);
    
    //setting coordinate for each tile
   
    //add color

    // 4 |||| faces

    //z-axis
    fill(color.get("front"));
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

//selecting cubes to turn
function selection(){

  //for loop for each cube
  for (let cube of cubes){

  }
}

//keys and rotations
function keyPressed(){

  // right -  r / right arrow key
  if (key === "r"){
    
    //goes through the grid of cubes
    for (let b of boxes){
      if (b.j === 1){

        //half_pi 90 degrees
        b.angle = HALF_PI;
      }
    }
  }
  // left - l / left arrow key
  if (key === "l"){
    for (let b of boxes){
      if (b.j === 1){
        b.angle = - HALF_PI;
      }
    }
  }
  // up - u / up arrow key
  if (key === "u"){
    for (let b of boxes){
      if (b.k === 1){
        newAngle = HALF_PI;
        newAngle = b.angle;
      }
    }
  }
  // down - d / down arrow key

}
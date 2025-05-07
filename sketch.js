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
  }

  display(){
    push();

    //changing origin
    translate(this.x, this.y, this.z);

    fill("white");
    stroke(1);
    strokeWeight(5);
    //box(this.sideLength);
    
    //creating custom cube with beginShape function "adding color"
    beginShape(QUADS);
    
    //setting coordinate for each tile
   
    //z-axis

    //select color
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
        
        boxes.push (new Box(x, y, z, sideLength));
      }
    }
  }
}

function draw() {

  background(255, 255, 204);//color code - #FFFFCC


  addCubes();
}

function preload(){
  myFont = loadFont("Kings-Regular.ttf");
}

function addCubes(){

  //able to move while mouse dragged
  orbitControl(2, 2, 2);

  for(let box of boxes){
    box.display();
  }
}
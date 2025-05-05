// Rubiks Cube Similator
// Khoi Tran
// April 29th, 2025
//
// Extra for Experts:
// - I learnt about 3D arrays
// - Used orbitControl function added it to set up first but it does work in draw function


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

    fill("white");
    stroke(0);
    strokeWeight(1);
    box(this.sideLength);
    
    //creating custom cube with beginShape function "adding color"
    beginShape(QUADS);
    
    //switching shapes into 3D tiles
      

    endShape();
    pop();
  }
};

//color
let color = ["white", "red", "green", "blue", "orange", "yellow"];

let boxes = [];
let sideLength = 75;
let dimensions = 3;
let r = sideLength / 2;

let myFont;

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

  title();

  push();
  addCubes();
  pop();
}

function preload(){
  myFont = loadFont("Kings-Regular.ttf");
}

function title(){
  fill(204, 204, 255);//color code - #CCCCFF
  textAlign(CENTER,CENTER);
  textFont(myFont);
  textSize(100);
  text("Rubiks Cube Simulator", 0, windowHeight / -3);
}

function addCubes(){

  //able to move while mouse dragged
  orbitControl(2, 2, 2);

  for(let box of boxes){
    box.display();
  }
}
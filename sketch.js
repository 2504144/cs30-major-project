// Rubiks Cube Similator
// Khoi Tran
// April 29th, 2025
//
// Extra for Experts:
// - I learnt about 3D arrays
// - Used orbitControl function


//nice reference - https://www.youtube.com/watch?v=W24xhB9PO54

//colors
let color = new Map();
color.set("up", "#fff700");//yellow
color.set("down", "#ffffff");//white
color.set("front", "#33daff");//blue
color.set("back", "#27ff00");//green
color.set("left", "#ff0000");//red
color.set("right", "#ff6400");//orange

//cube creation
let boxes = [];
let sideLength = 75;
let dimensions = 3;
let r = sideLength / 2;

//key binds
const defaultKeys = ["r", "R","l", "L","u", "U","d", "D","f", "F","b", "B"];

//animation - not done yet
let animate = false;
let speed = 0.2;
let angle = 0;


class Box{
  constructor(x, y, z, sideLength){
    this.sideLength = sideLength;
    this.x = x;
    this.y = y;
    this.z = z;
    
    //let the faces have there own numbers
    // 3 ||| faces

    this.face = [
      new Face(createVector(0,0,1), color.get("front")),
      new Face(createVector(0,0,-1), color.get("back")),
      new Face(createVector(0,-1,0), color.get("up")),
      new Face(createVector(0,1,0), color.get("down")), 
      new Face(createVector(1,0,0), color.get("right")), 
      new Face(createVector(-1,0,0), color.get("left")),
    ];

    //OG version
    // fill(color.get("front"));
    // //setting coordinate for each tile
    // vertex(-r, -r, r);
    // vertex(r, -r, r);
    // vertex(r, r, r);
    // vertex(-r, r, r);
  }

  display(){
    push();

    //changing origin
    translate(this.x, this.y, this.z);

    stroke(1);
    strokeWeight(5);

    for (let f of this.face){
      f.show();
    }

    pop();
  }

  //rotation
  turnX(angle){
    for (let f of this.face){
      f.turnX(angle);
    }
  }
  turnY(angle){
    for (let f of this.face){
      f.turnY(angle);
    }
  }
  turnZ(angle){
    for (let f of this.face){
      f.turnZ(angle);
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

    //direction
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

  //rotation around axis
  turnX(angle){
    //current X
    let x = this.v.x;

    //rotate face around X axis (corners)
    let y = round(this.v.y * cos(angle) - this.v.z * sin(angle));
    let z = round(this.v.y * sin(angle) + this.v.z * cos(angle));

    //update positions of colours
    this.v = createVector(x, y, z);
  }

  //y
  turnY(angle){
    let y = this.v.y;
    let x = round(this.v.x * cos(angle) - this.v.z * sin(angle));
    let z = round(this.v.x * sin(angle) + this.v.z * cos(angle));
    this.v = createVector(x, y, z);
  }

  //z
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

  //side navigation
  sideNav();
}

function draw() {

  background(255, 255, 204);//color code - #FFFFCC

  addCubes();
}

//window resizing
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

//keys and rotations(rubic notations)
function keyPressed(){

  //for X axis: 0 - left, 1 - middle, 2 - right

  //r
  if (key === defaultKeys[0]){
    turnLayerX(2);
  }

  //r'
  if (key === defaultKeys[1]){
    turnLayerXCounterClockwise(2);
  }

  //l
  if (key === defaultKeys[2]){
    turnLayerXCounterClockwise(0);
  }

  //l'
  if (key === defaultKeys[3]){
    turnLayerX(0);
  }

  //for Y axis: 0 - top, 1 - middle, 2 - bottom
  //u
  if (key === defaultKeys[4]){
    turnLayerY(0);
  }

  //u'
  if (key === defaultKeys[5]){
    turnLayerYCounterClockwise(0);
  }

  //d
  if (key === defaultKeys[6]){
    turnLayerYCounterClockwise(2);
  }

  //d'
  if (key === defaultKeys[7]){
    turnLayerY(2);
  }

  //for Z axis: 0 - back, 1 - middle, 2 - front
  //f
  if (key === defaultKeys[8]){
    turnLayerZ(2);
  }

  //f'
  if (key === defaultKeys[9]){
    turnLayerZCounterClockwise(2);
  }

  //b
  if (key === defaultKeys[10]){
    turnLayerZCounterClockwise(0);
  }

  //b'
  if (key === defaultKeys[11]){
    turnLayerZ(0);
  }
}

//x face - clock wise
function turnLayerX(xPosition){
  let layer = [];

  //pushes each singular face onto the list and keeps track of colour
  for (let b of boxes){
    if (b.x === xPosition * sideLength - sideLength){
      layer.push(b);
    }
  }

  //going through boxes on face
  for (let b of layer){

    //change to grid positions
    let y = (b.y + sideLength) / sideLength;
    let z = (b.z + sideLength) / sideLength;

    //rotate 90 degrees - switch around to turn opposite way
    let newY = 2 - z;     //let newY = z;
    let newZ = y;         //let newZ = 2 - y;

    //change back to normal positions
    b.y = (newY - 1) * sideLength;
    b.z = (newZ - 1) * sideLength;

    //rotation from before
    b.turnX(HALF_PI); //oppisite - b.turnX(-HALF_PI);
    //OG version
    // for (let box of boxes){
    //   if (box.x === sideLength){
    //     box.turnX(HALF_PI);
    //   }
    // }
  }
}

//x face - counterclockwise
function turnLayerXCounterClockwise(xPosition){
  let layer = [];

  for (let b of boxes){
    if (b.x === xPosition * sideLength - sideLength){
      layer.push(b);
    }
  }

  for (let b of layer){

    let y = (b.y + sideLength) / sideLength;
    let z = (b.z + sideLength) / sideLength;

    let newY = z;
    let newZ = 2 - y;

    b.y = (newY - 1) * sideLength;
    b.z = (newZ - 1) * sideLength;

    b.turnX(-HALF_PI);
  }
}

//Y face - clockwise
function turnLayerY(yPosition){
  let layer = [];

  for (let b of boxes){
    if (b.y === yPosition * sideLength - sideLength){
      layer.push(b);
    }
  }

  for (let b of layer){

    let x = (b.x + sideLength) / sideLength;
    let z = (b.z + sideLength) / sideLength;

    let newY = 2 - z;
    let newZ = x;

    b.x = (newY - 1) * sideLength;
    b.z = (newZ - 1) * sideLength;

    b.turnY(HALF_PI);
  }
}

//Y face - counter clockwise
function turnLayerYCounterClockwise(yPosition){
  let layer = [];

  for (let b of boxes){
    if (b.y === yPosition * sideLength - sideLength){
      layer.push(b);
    }
  }

  for (let b of layer){

    let x = (b.x + sideLength) / sideLength;
    let z = (b.z + sideLength) / sideLength;

    let newX = z;
    let newZ = 2 - x;

    b.x = (newX - 1) * sideLength;
    b.z = (newZ - 1) * sideLength;

    b.turnY(-HALF_PI);
  }
}

//Z face
function turnLayerZ(zPosition){
  let layer = [];

  for (let b of boxes){
    if (b.z === zPosition * sideLength - sideLength){
      layer.push(b);
    }
  }

  for (let b of layer){

    let x = (b.x + sideLength) / sideLength;
    let y = (b.y + sideLength) / sideLength;

    let newX = 2 - y;
    let newY = x;

    b.x = (newX - 1) * sideLength;
    b.y = (newY - 1) * sideLength;

    b.turnZ(HALF_PI);
  }
}

//Z face - counter clockwise
function turnLayerZCounterClockwise(zPosition){
  let layer = [];

  for (let b of boxes){
    if (b.z === zPosition * sideLength - sideLength){
      layer.push(b);
    }
  }

  for (let b of layer){

    let x = (b.x + sideLength) / sideLength;
    let y = (b.y + sideLength) / sideLength;

    let newX = y;
    let newY = 2 - x;

    b.x = (newX - 1) * sideLength;
    b.y = (newY - 1) * sideLength;

    b.turnZ(-HALF_PI);
  }
}


function addCubes(){

  //able to move while mouse dragged
  orbitControl(2, 2, 2);

  for(let box of boxes){
    box.display();
  }
}


//buttons on sidebar
function sideNav(){
  control();
  notation();
  dropdown();

  //working on these
  // setButton();
  // keySystem();
}

function control(){
  //connect from HTML to JS
  let control = document.getElementsByClassName("control-btn");
  
  for (let i = 0; i < control.length; i++){
    
    //each button
    control[i].addEventListener("click", 
      function() {

        //if clicked
        this.classList.toggle("active");

        let dropdownContent = this.nextElementSibling;

        //what shows
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } 
        else {
          dropdownContent.style.display = "block";
        }
      });
  }
}

function notation(){
  let notation = document.getElementsByClassName("notation-btn");

  for (let i = 0; i < notation.length; i++){
    
    notation[i].addEventListener("click", 
      function() {

        this.classList.toggle("active");

        let dropdownContent = this.nextElementSibling;

        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } 
        else {
          dropdownContent.style.display = "block";
        }
      });
  }
}

function dropdown(){
  let dropdown = document.getElementsByClassName("dropdown-btn");

  for (let i = 0; i < dropdown.length; i++){
    
    dropdown[i].addEventListener("click", function() {

      this.classList.toggle("active");

      let dropdownContent = this.nextElementSibling;

      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } 
      else {
        dropdownContent.style.display = "block";
      }
    });
  }
}

//when set button clicked
function setButton(){
  let set = document.getElementByClass("set");

  for (let i = 0; i < set.length; i++){
    
    //each button
    set[i].addEventListener("click", 
      function() {

        //if clicked
        this.classList.toggle("active");

        let dropdownContent = this.nextElementSibling;

        //what shows
        if (input.toggle === "active") {
          return input();
        } 
        else {
          dropdownContent.style.display = "block";
        }
      });
  }
}

//if key is changed
function keySystem(){
  let key = document.getElementById("r-key");

  for (let i = 0; i < key.length; i++){
    
    //each button
    key[i].addEventListener("click", 
      function() {

        //if clicked
        this.classList.toggle("active");

        let dropdownContent = this.nextElementSibling;

        //what shows
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } 
        else {
          dropdownContent.style.display = "block";
        }
      });
  }
}
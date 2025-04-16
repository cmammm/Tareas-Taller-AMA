let classifier;
let img;
let label;

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
  img = loadImage("assets/guitarra.jpg");
}

function gotResults(results) {
  console.log(results);
  label=results[0].label;
}


function setup() {
  createCanvas(400, 400);
  classifier.classify(img, gotResults);
}

function draw() {
  background(220);
  image(img, 0, 0, width, height);

  rectMode(CENTER);
  fill(0);
  rect(200, 200, 400, 50);
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  noStroke();
  text(label, 200, 200);
}

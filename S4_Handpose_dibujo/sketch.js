let handPose;
let video;
let hands = [];
let painting;

function preload() {
  handPose = ml5.handPose({flipped: true});
}

function mousePressed(){
  handPose = ml5.handPose
}

function mousePressed(){
  console.log(hands)
}

function setup() {
  createCanvas(640, 480);
  painting = createGraphics(640,480);
  painting.clear();
    // Create the video and hide it
  video = createCapture(VIDEO, {flipped: true});
  video.size(640, 480);
  video.hide();
    // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}
// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function draw() {
  image(video, 0, 0, width, height);
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      //let keypoint = hand.keypoints[j];
      let index  = hand.keypoint[8]
      fill(255, 192, 203);
      noStroke();
      //circle(keypoint.x, keypoint.y, 10);
      rect(index.x, index.y,30,30)
    }
  }
}
let handPose;
let video;
let hands = [];

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
    // Crea video y escondelo
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    //Empieza a detectar manos con la webcam video
    handPose.detectStart(video, gotHands);
  }

// Función Callback para cuando handPose saca datos
function gotHands(results) {
  // Salva los datos a la variable hands
  hands = results;
}


function draw() {
  image(video, 0, 0, width, height);
  // Dibuja todos los puntos vistos de la mano
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
}

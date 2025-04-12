let video;
let handPose;
let hands = [];
let painting;
let pintar;
let dedo;

function setup() {
  createCanvas(640, 480);
  painting = createGraphics(640, 480);
  painting.clear();

  pintar = createGraphics(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Iniciar handpose
  handPose = ml5.handpose(video, { flipHorizontal: true }, () => {
    console.log("Modelo cargado");
  });

  handPose.on("predict", gotHands);
}

function gotHands(results) {
  hands = results;
}

function draw() {
  image(video, 0, 0); // Mostrar el video

  // Detectar y dibujar las manos
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    for (let j = 0; j < hand.landmarks.length; j++) {
      dedo = hand.landmarks[8]; 

      let x = width - dedo[0];  
      let y = dedo[1];

      pintar.fill(255, 90, 12);
      pintar.noStroke();          
      pintar.circle(x, y, 40);
    }
  }


  image(pintar, 0, 0);
}

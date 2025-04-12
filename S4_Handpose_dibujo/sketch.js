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

  // Iniciar el modelo handpose correctamente
  handPose = ml5.handpose(video, { flipHorizontal: true }, () => {
    console.log("Modelo cargado 💅");
  });

  // Conectar con la función de resultados
  handPose.on("predict", gotHands); // Usamos 'predict' para recibir las manos
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
      dedo = hand.landmarks[8]; // Usamos el punto del índice (dedo)

      // Invertir la posición X para corregir el reflejo del dibujo
      let x = width - dedo[0];  // Invertir la coordenada X
      let y = dedo[1];

      pintar.fill(255, 90, 12);   // Color del dibujo (naranja)
      pintar.noStroke();          // Sin borde
      pintar.circle(x, y, 40);    // Dibujar el círculo en la posición correcta
    }
  }

  // Mostrar la capa 'pintar' encima del video
  image(pintar, 0, 0);
}

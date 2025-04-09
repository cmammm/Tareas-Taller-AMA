let bodyPose;
let video;
let poses = [];
let connections;
let painting;
let img1;
let img2;

function preload() {
  // Cargar el modelo bodyPose (asumimos que está disponible en tu entorno ml5)
  bodyPose = ml5.bodyPose({ flipped: true });

  img1 = loadImage("assets/armadura.png");
  img2 = loadImage("assets/espada.png");
}

function mousePressed() {
  console.log(poses);
}

function setup() {
  // Lienzo de pantalla
  createCanvas(windowWidth, windowHeight);

  // Capa para gráficos
  painting = createGraphics(windowWidth, windowHeight);
  painting.clear();

  // Video y configuración
  video = createCapture(VIDEO, { flipped: true });
  video.size(windowWidth, windowHeight);
  video.hide();

  // Iniciar detección de poses
  bodyPose.detectStart(video, gotPoses);
  connections = bodyPose.getSkeleton();
}

// Callback del modelo
function gotPoses(results) {
  poses = results;
}

function draw() {
  painting.noStroke();

  // Mostrar video
  image(video, 0, 0, width, height);

  // Iterar sobre poses detectadas
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    // Verificamos que tenga los puntos clave necesarios
    if (pose.keypoints.length >= 11) {
      let index1 = pose.keypoints[6];  // Hombro derecho
      let index2 = pose.keypoints[10]; // Muñeca derecha

      // --- ARMADURA ---
      if (index1.confidence > 0.1) {
        fill(0, 0, 0);
        noStroke();
        circle(index1.x, index1.y, 10);
        image(img1, index1.x - 460, index1.y - 100, 600, 550);
      }

      // --- ESPADA ---
      if (index2.confidence > 0.1) {
        fill(0, 0, 0);
        noStroke();
        circle(index2.x, index2.y, 10);
        image(img2, index2.x - 120, index2.y - 300, 200, 400);
      }
    }
  }

  // Mostrar capa de gráficos
  image(painting, 0, 0);
}

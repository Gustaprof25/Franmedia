import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.165.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.165.0/examples/jsm/controls/OrbitControls.js";

const container = document.querySelector(".div3D");

if (!container) {
  console.error("Div .div3D não encontrada!");
}

// ======================
// CENA
// ======================

const scene = new THREE.Scene();

// Fundo temporário para teste
scene.background = new THREE.Color(0x111111);

// ======================
// CÂMERA
// ======================

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.01,
  5000
);

camera.position.set(0, 0, 5);

// ======================
// RENDERER
// ======================

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(
  container.clientWidth,
  container.clientHeight
);

container.appendChild(renderer.domElement);

// ======================
// CONTROLES
// ======================

const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

// ======================
// LUZES
// ======================

scene.add(
  new THREE.AmbientLight(
    0xffffff,
    4
  )
);

const light1 = new THREE.DirectionalLight(
  0xffffff,
  5
);

light1.position.set(
  10,
  10,
  10
);

scene.add(light1);

const light2 = new THREE.DirectionalLight(
  0xffffff,
  3
);

light2.position.set(
  -10,
  5,
  -10
);

scene.add(light2);

// ======================
// HELPER (REMOVER DEPOIS)
// ======================

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// ======================
// CARREGAR MODELO
// ======================

const loader = new GLTFLoader();
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({
        color: 0x00ff00
    })
);

scene.add(cube);
loader.load(

  "./img/camera-3d.glb",

  (gltf) => {

    const model = gltf.scene;

    scene.add(model);

    // Caixa delimitadora
    const box = new THREE.Box3().setFromObject(model);

    const center = box.getCenter(
      new THREE.Vector3()
    );

    const size = box.getSize(
      new THREE.Vector3()
    );

    // Centraliza modelo
    model.position.sub(center);

    // Escala automática
    const maxDim = Math.max(
      size.x,
      size.y,
      size.z
    );

    const scale = 3 / maxDim;

    model.scale.setScalar(scale);

    // Recalcula
    const box2 = new THREE.Box3().setFromObject(model);

    const size2 = box2.getSize(
      new THREE.Vector3()
    );

    // Distância ideal da câmera
    const maxSize = Math.max(
      size2.x,
      size2.y,
      size2.z
    );

    camera.position.set(
      0,
      maxSize * 0.5,
      maxSize * 2.5
    );

    camera.lookAt(0, 0, 0);

    controls.target.set(
      0,
      0,
      0
    );

    controls.update();

    console.log("Modelo carregado!");
    console.log("Tamanho:", size);

  },

  (xhr) => {

    if (xhr.total) {

      console.log(
        Math.round(
          (xhr.loaded / xhr.total) * 100
        ) + "%"
      );

    }

  },

  (error) => {

    console.error(
      "Erro ao carregar GLB:",
      error
    );

  }

);

// ======================
// RESPONSIVO
// ======================

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      container.clientWidth /
      container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

  }
);

// ======================
// LOOP
// ======================

function animate() {

  requestAnimationFrame(
    animate
  );

  controls.update();

  renderer.render(
    scene,
    camera
  );

}

animate();
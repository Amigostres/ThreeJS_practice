import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/Addons.js'

const scene = new THREE.Scene()



const camera = new THREE.PerspectiveCamera( 
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
  ) 


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, innerHeight )

camera.position.setZ(20)
renderer.render( scene, camera )

//sphere!!
const geometry = new THREE.SphereGeometry( 5, 32, 16 ); 
const material = new THREE.MeshStandardMaterial( { color: 0xff5555 } ); 
const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere );
const gridhelper = new THREE.GridHelper(30,30)
scene.add(gridhelper)

//light!!!
const pointLight = new THREE.PointLight(0xffffff, 200)
pointLight.position.set(5,5,5)
// scene.add(pointLight)
const pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)
const DirectionalLight = new THREE.DirectionalLight({ color: 0xffffff, intensity : 200 })
scene.add(DirectionalLight)
const DirectionalLightHelper = new THREE.DirectionalLightHelper(DirectionalLight)
DirectionalLight.position.set(-100, 200, 100)

scene.add(DirectionalLightHelper)

const ambientLight = new THREE.AmbientLight({ color:0xffffff })
// scene.add(ambientLight)

//starsss!!!
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh( geometry, material )

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)

}

Array(500).fill().forEach(addStar)


//backgound
const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture


//contorls
const controls = new OrbitControls(camera, renderer.domElement)

function animate(){
  requestAnimationFrame(animate)
  renderer.render ( scene, camera )
}
animate()
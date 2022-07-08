/* 
Project name: Magical room 
Student number: 106740
Code has been written for educational purposes. 
I've created the model in Blender for different course project - LM4, and the textures were provided by the teacher.
Project2 for ICG class, done using Threejs-journey course by Bruno Simon, youtube(Working with Three.js Particle Systems - They're AWESOME!) 
by DesignCourse, a lot of stackoverflow, examples from ICG class and three.js documentation. 
*/

/*--------------------------- IMPORT --------------------------------------------------------------------  */

import './style.css'
import * as THREE from 'three' 
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js' //we cannot acces to draco loader using gltf loader so we have to import it 
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as dat from 'dat.gui'
import {sRGBEncoding } from 'three'
import {gsap} from 'gsap'
import {DragControls} from 'three/examples/jsm/controls/DragControls.js'


const parameters = {color: 0xff0000} //instantiate variable for changing color in gui folder 

/*--------------------------- LOADERS -------------------------------------------------------------------- */

/*---------- LOADING BAR --------- learned with threejs-journey course */
const loadingBarElement = document.querySelector('.loading-bar') //classic JavaScript function to get an element and put into variable


const loadingManager = new THREE.LoadingManager(
    //Loading
    ()=>
    {   
        window.setTimeout(() =>
        {
        gsap.to(overlayMaterial.uniforms.uAlpha, {duration:3, value:0, delay:1})
        loadingBarElement.classList.add('ended')   //adding class to js 
        loadingBarElement.style.transform = ''  //we are removing it from the js so the css value has more strength 
        }, 500) //we will wait 0.5s
    },
    //Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        const progressRatio = itemsLoaded/itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})` //it has to be in string line - injecting variable into string 
        //console.log(progressRatio)
    }
)

const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)
const wallTextureLoader = new THREE.TextureLoader(loadingManager)
const stonesTextureLoader = new THREE.TextureLoader(loadingManager)
const groundTextureLoader = new THREE.TextureLoader(loadingManager)
const ground2TextureLoader = new THREE.TextureLoader(loadingManager)

//We have to instantiate DracoLoader before the gltf loader  //learned from threejs-journey course
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./assets/draco/')  /*now our draco loader will use faster version with web assembly with worker   */


const gltfLoader = new GLTFLoader() //we are instantiating the loader
gltfLoader.setDRACOLoader(dracoLoader)  //the draco loader instance to the gltf loader 


/*---------- LOADING MODELS  ---------   */
gltfLoader.load(
    './assets/models/wall2.glb',
    (gltf)=>
    {
        gltf.scene.position.set(0,0,0)
        gltf.scene.scale.set(2,2,2)
        gltf.scene.traverse((model) =>{
            if(model.isMesh)
            {  
            model.material.map = wallColorTexture,
            model.material.normalMap = wallNormalTexture, 
            model.material.aolMap = wallAbientOcclusionTexture,
            model.material.roughnessMap = wallRoughnessTexture,
            model.material.displacementlMap = wallDisplacementTexture;  
            }
        })
        scene.add(gltf.scene)
    }) 
    gltfLoader.load(
        './assets/models/book2.glb',
        (gltf)=>
        {
            gltf.scene.position.set(0,0,0)
            gltf.scene.scale.set(2,2,2)
            scene.add(gltf.scene) 
        })  
    gltfLoader.load(
        './assets/models/books.glb',
        (gltf)=>
        {
            gltf.scene.position.set(0,0,0)
            gltf.scene.scale.set(2,2,2)
            scene.add(gltf.scene) 
        })  
  /*  gltfLoader.load(
        './assets/models/bookstore.glb',
        (gltf)=>
        {
            gltf.scene.position.set(0,0,0)
            gltf.scene.scale.set(2,2,2)
            scene.add(gltf.scene) 
        }) 
        */ 
    gltfLoader.load(
        './assets/models/floor.glb',
        (gltf)=>
        {
            gltf.scene.position.set(0,0,0)
            gltf.scene.scale.set(2,2,2)
            gltf.scene.traverse((model) =>{
                if(model.isMesh)
                {
                model.material.map = ground2ColorTexture,
                model.material.normalMap = ground2NormalTexture, 
                //model.material.aolMap = ground2AbientOcclusionTexture,
                model.material.roughnessMap = ground2RoughnessTexture,
                model.material.displacementlMap = ground2DisplacementTexture;  
                }
            })
            scene.add(gltf.scene) 
        }) 
    gltfLoader.load(
        './assets/models/wood_things.glb',
        (gltf)=>
        {
            gltf.scene.position.set(0,0,0)
            gltf.scene.scale.set(2,2,2)
            gltf.scene.traverse((model) =>{
                if(model.isMesh)
                {
                model.material.map = wallColorTexture,
                model.material.normalMap = wallNormalTexture, 
                model.material.aolMap = wallAbientOcclusionTexture,
                model.material.roughnessMap = wallRoughnessTexture,
                model.material.displacementlMap = wallDisplacementTexture;  
                }
            })
            scene.add(gltf.scene) 
        }) 
     gltfLoader.load(
        './assets/models/water3.glb',
        (gltf)=>
        {
            gltf.scene.position.set(0,0,0)
            gltf.scene.scale.set(2,2,2)
            gltf.scene.traverse((model) =>{
                if(model.isMesh)
                {
                model.material = new THREE.MeshPhysicalMaterial({
                    roughness: 0,
                    transmission:1,
                }) 
                }
            })
            scene.add(gltf.scene) 
        })    
     gltfLoader.load(
        './assets/models/stones.glb',
        (gltf)=>
        {
            gltf.scene.position.set(0,0,0)
            gltf.scene.scale.set(2,2,2)
            gltf.scene.traverse((model) =>{
                if(model.isMesh)
                {
                
                model.material.map = stonesColorTexture,
                model.material.normalMap = stonesNormalTexture, 
                model.material.aolMap = stonesAbientOcclusionTexture,
                model.material.roughnessMap = stonesRoughnessTexture,
                model.material.displacementlMap = stonesDisplacementTexture;  
                }
            })
            scene.add(gltf.scene) 
        }) 

          
/*--------------------------- DEBUG --------------- */


/*--------------------------- DEBUG -------------------------------------------------------------------- */

const debugObject = {}   //its like containter - to put smth inside - in this case color 
const gui = new dat.GUI({closed:false})   //Debug controls are open when we enter the site 


/*---------------- CREATING FOLDERS ----------------- */

const waterFolder = gui.addFolder('Water')
waterFolder
    .addColor(parameters, 'color')
    .onChange(() =>
    {
        rectAreaLight.color.set(parameters.color)
        rectAreaLight2.color.set(parameters.color)
        rectAreaLight3.color.set(parameters.color)  
    })

const Candle1Folder = gui.addFolder('Candle1')  //Pointlight for candle 1
const Candle2Folder = gui.addFolder('Candle2')  //Pointlight for candle 2
const Candle3Folder = gui.addFolder('Candle3')  //Pointlight for candle 3
const Candle4Folder = gui.addFolder('Candle4')  //Pointlight for candle 4


/*--------------------------- CANVAS ----------------- */
const canvas = document.querySelector('canvas.webgl')


/*--------------------------- SCENE ----------------- */
const scene = new THREE.Scene()


/*--------------------------- GROUPS -------------------------------------------------------------------- */

const candle1Group = new THREE.Group()  //pointlight
scene.add(candle1Group)
const candle2Group = new THREE.Group()  //pointlight2
scene.add(candle2Group)
const candle3Group = new THREE.Group()  //pointlight3
scene.add(candle3Group)
const candle4Group = new THREE.Group()  //pointlight4
scene.add(candle4Group)
const waterGroup = new THREE.Group()
scene.add(waterGroup)

/*--------------------------- ENVIRONMENT  MAP -------------------------------------------------------------------- */
const environmentMap = cubeTextureLoader.load([
    './assets/skybox/skybox_front.png',
    './assets/skybox/skybox_back.png',
    './assets/skybox/skybox_up.png',
    './assets/skybox/skybox_down.png',
    './assets/skybox/skybox_right.png',
    './assets/skybox/skybox_left.png',
])
scene.background = environmentMap



/*--------------------------- TEXTURES -------------------------------------------------------------------- */

const wallColorTexture = wallTextureLoader.load('./assets/models/textures/WoodSiding001_1K_Color.jpg')
const wallNormalTexture = wallTextureLoader.load('./assets/models/textures/WoodSiding001_1K_NormalGL.jpg')
const wallAbientOcclusionTexture = wallTextureLoader.load('./assets/models/textures/WoodSiding001_1K_AmbientOcclusion.jpg')
const wallRoughnessTexture = wallTextureLoader.load('./assets/models/textures/WoodSiding001_1K_Roughness.jpg')
const wallDisplacementTexture = wallTextureLoader.load('./assets/models/textures/WoodSiding001_1K_Displacement.jpg')

const stonesColorTexture = stonesTextureLoader.load('./assets/models/textures/Rock034_1K_Color.jpg')
const stonesNormalTexture = stonesTextureLoader.load('./assets/models/textures/Rock034_1K_NormalGL.jpg')
const stonesAbientOcclusionTexture = stonesTextureLoader.load('./assets/models/textures/Rock034_1K_AmbientOcclusion.jpg')
const stonesRoughnessTexture = stonesTextureLoader.load('./assets/models/textures/Rock034_1K_Roughness.jpg')
const stonesDisplacementTexture = stonesTextureLoader.load('./assets/models/textures/Rock034_1K_Displacement.jpg')

const groundColorTexture = groundTextureLoader.load('./assets/models/textures/Gravel024_1K_Color.jpg')
const groundNormalTexture = groundTextureLoader.load('./assets/models/textures/Gravel024_1K_NormalGL.jpg')
const groundAbientOcclusionTexture = groundTextureLoader.load('./assets/models/textures/Gravel024_1K_AmbientOcclusion.jpg')
const groundRoughnessTexture = groundTextureLoader.load('./assets/models/textures/Gravel024_1K_Roughness.jpg')
const groundDisplacementTexture = groundTextureLoader.load('./assets/models/textures/Gravel024_1K_Displacement.jpg')

const ground2ColorTexture = ground2TextureLoader.load('./assets/models/textures/Ground002_2K_Color.jpg')
const ground2NormalTexture = ground2TextureLoader.load('./assets/models/textures/Ground002_2K_NormalGL.jpg')
//const ground2AbientOcclusionTexture = ground2TextureLoader.load('./assets/models/textures/Gravel024_1K_AmbientOcclusion.jpg')
const ground2RoughnessTexture = ground2TextureLoader.load('./assets/models/textures/Ground002_2K_Roughness.jpg')
const ground2DisplacementTexture = ground2TextureLoader.load('./assets/models/textures/Ground002_2K_Displacement.jpg')


/*--------------------------- OVERLAY ------------------------------------------learned with threejs-journey course  */
const overlayGeometry = new THREE.PlaneGeometry(20,20,1,1)
const overlayMaterial = new THREE.ShaderMaterial({  
    transparent: true,
    uniforms:
    {
        uAlpha: {value:1}
    },
    vertexShader:`
    void main()
    {
        gl_Position = vec4(position, 10);
    }
    `,
    fragmentShader: `
    uniform float uAlpha;

    void main()
    {
        gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
    }`

})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)


var sphereGeometry = new THREE.SphereGeometry(40,40,40)
var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x00ffff})
var object = new THREE.Mesh(sphereGeometry, sphereMaterial)

//const dControl = new THREE.DragControls(object, camera, renderer.domElement)



/*--------------------------- MODELS -------------------------------------------------------------------- */

//Sphere for candle1 
const sphere1Geometry = new THREE.SphereGeometry(0.01,15,15)
                            //radius, widthSegments, heightSegments, 
const sphere1Material = new THREE.MeshBasicMaterial( {color: 0xffff00})
const pointLightSphere1 = new THREE.Mesh (sphere1Geometry, sphere1Material)
pointLightSphere1.position.set(0,0,0)
candle1Group.add(pointLightSphere1)
candle1Group.position.set(-2.65,1,-1)  //ideal position for the candle 

//Sphere for candle2
const sphere2Geometry = new THREE.SphereGeometry(0.01,15,15)
const sphere2Material = new THREE.MeshBasicMaterial( {color: 0xffff00})
const pointLightSphere2 = new THREE.Mesh (sphere2Geometry, sphere2Material)
pointLightSphere2.position.set(0,0,0)
candle2Group.add(pointLightSphere2)
candle2Group.position.set(3.25,1.1,-0.75)  

//Sphere for candle3
const sphere3Geometry = new THREE.SphereGeometry(0.01,15,15) 
const sphere3Material = new THREE.MeshBasicMaterial( {color: 0xffff00})
const pointLightSphere3 = new THREE.Mesh (sphere3Geometry, sphere3Material)
pointLightSphere3.position.set(0,0,0)
candle3Group.add(pointLightSphere3)
candle3Group.position.set(-1.4,3.2,-6)  

//Sphere for candle4
const sphere4Geometry = new THREE.SphereGeometry(0.01,15,15)
const sphere4Material = new THREE.MeshBasicMaterial( {color: 0xffff00})
const pointLightSphere4 = new THREE.Mesh (sphere4Geometry, sphere4Material)
pointLightSphere4.position.set(0,0,0)
candle4Group.add(pointLightSphere4)
candle4Group.position.set(3.6,3.2,-4) 


/*--------------------------- LIGHTS -------------------------------------------------------------------- */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)  //looks better without 
scene.add(ambientLight)


//Point light for the candle1
const pointLight = new THREE.PointLight(0xffffff0, 0.2, 20)
pointLight.position.set = (0,0,0)
candle1Group.add(pointLight)
Candle1Folder.add(candle1Group, 'visible')

//Point light for the candle2
const pointLight2 = new THREE.PointLight(0xffffff0, 0.2, 15)
pointLight2.position.set = (0,0,0)
candle2Group.add(pointLight2)
Candle2Folder.add(candle2Group, 'visible')

//Point light for the candle3
const pointLight3 = new THREE.PointLight(0xffffff0, 0.2, 15)
pointLight3.position.set = (0,0,0)
candle3Group.add(pointLight3)
Candle3Folder.add(candle3Group, 'visible')

//Point light for the candle4
const pointLight4 = new THREE.PointLight(0xffffff0, 0.2, 15)
pointLight4.position.set=(0,0,0)
candle4Group.add(pointLight4)
Candle4Folder.add(candle4Group, 'visible')



/*---------------- WATER ----------------- */

const rectAreaLight = new THREE.RectAreaLight(0x0000ff, 30, 3,1.5)
                            //color, intensity, width, height)
rectAreaLight.rotation.y=  Math.PI *0.5
rectAreaLight.position.set(1,-0.17,0.328)
scene.add(rectAreaLight)

waterFolder.add(rectAreaLight.position, 'x').min(-5).max(5).step(0.001).name('rectAreaLightX')  //commented because I've found the best position
waterFolder.add(rectAreaLight.position, 'y').min(-5).max(5).step(0.001).name('rectAreaLightY')
waterFolder.add(rectAreaLight.position, 'z').min(-5).max(5).step(0.001).name('rectAreaLightZ')


const rectAreaLight2 = new THREE.RectAreaLight(0x0000ff, 30, 4,1)
                            //color, intensity, width, height)
rectAreaLight2.rotation.y=  Math.PI *0.5
rectAreaLight2.position.set(1,2.5,-4.4)
waterGroup.add(rectAreaLight2)
//waterFolder.add(rectAreaLight2, 'visible')


const rectAreaLight3 = new THREE.RectAreaLight(0x0000ff, 30, 4,1) 
rectAreaLight3.rotation.y=  Math.PI *0.5
rectAreaLight3.rotation.x=  Math.PI *0.5

rectAreaLight3.position.set(1.154,0.5,-1.38)
rectAreaLight3.rotation.set(-0.5,-4.68,-1.5)
waterGroup.add(rectAreaLight3)


waterFolder.add(waterGroup, 'visible')
waterFolder.add(rectAreaLight, 'intensity')  //I've got problem with putting this
waterFolder.add(rectAreaLight2, 'intensity')  //as a waterGroup - the site were freezing 
waterFolder.add(rectAreaLight3, 'intensity')



/*--------------------------- FIREFLIES -------------------------------------------------------------------- */
//from Patricle system - they are awesome by Design Course - yt 
const particlesGeometry = new THREE.BufferGeometry()
const particlesCount = 200
const posArray = new Float32Array(particlesCount *3)
//here we are specifing the size of the array - for us its the count of fireflies  *3 
//-> because we want to have 3 variables for position - x,y,z
//becaues of xyz, xyz, xyz...

for(let i = 0; i<particlesCount; i++)   //changed the position for my purposes
{
    posArray[i*3 + 0] = ((Math.random()-0.5) * 1)+0.5
    posArray[i*3 + 1] = (Math.random() * 10) - 0.25
    posArray[i*3 + 2] = ((Math.random()-0.5) * 8) -2
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
//this is sending postitionArray as the attribute to our geometry ^ 
//name for the attribute is position, after we have to convert it to the buffer attribute. 
//And at the end we have to spicify how many values per vertex we want -in this case as for position - 3 values: x,y,z 


const particlesMaterial = new THREE.PointsMaterial({ size: 0.01})
const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particleMesh)


/* --------------------------- SIZES -------------------------------------------------------------------- */
const sizes = {
width: window.innerWidth,
height: window.innerHeight
}

window.addEventListener('resize', () =>  //code knows when is the resizing and what to do 
    {
        //Update sizes 
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        //Update camera
        camera.aspect = sizes.width/sizes.height //aspect ratio
        camera.updateProjectionMatrix()  //without this camera the object is squezed 
        //Update renderer 
        renderer.setSize(sizes.width,sizes.height)
    })


/*--------------------------- CAMERA -------------------------------------------------------------------- */

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1,100)
camera.position.set(2,2,2)
scene.add(camera)

/* CONTROLS ----------------- */
const controls = new OrbitControls(camera, canvas)
//controls.target.y =-2
controls.enableDamping = true //po przesunieciu ekranu nie zatrzymuje sie on od razu tylko po chwili 


/*--------------------------- RENDERER -------------------------------------------------------------------- */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true  //to not see artifacts like stair effect on the esges 
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap 
renderer.outputEncoding = sRGBEncoding
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera) 

debugObject.clearColor = '#201818'  //clear color is the property //debug Object is the container 
renderer.setClearColor(debugObject.clearColor)  //from threejs-journey course 
gui
    .addColor(debugObject, 'clearColor')
    .onChange(() =>
    {
        renderer.setClearColor(debugObject.clearColor)
    })


/*--------------------------- ANIMATIONS -------------------------------------------------------------------- 
*/
const clock = new THREE.Clock() 
let previousTime = 0 





const tick = () =>  //A tick is the dequeuing of an event from the "event loop queue" and the execution of said event
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    /* deltaTime contains the time difference between the beginning 
    of the previous frame and the beginning of the current frame in milliseconds. */
    previousTime = elapsedTime

    particleMesh.position.y= Math.sin(elapsedTime)
    candle1Group.position.y= (Math.sin(elapsedTime)/20 +1.1)
    candle2Group.position.y= (Math.cos(elapsedTime)/20 +1.1)
    candle3Group.position.y= (Math.cos(elapsedTime)/20 +3.3)
    candle4Group.position.y= (Math.sin(elapsedTime)/20 +3.3)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()
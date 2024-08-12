// Initialize necessary variables
let scene;
let camera;
let renderer;

// Main function to set up the scene
function main() {
    // Select the canvas element
    const canvas = document.querySelector('#c');

    // Create a new scene
    scene = new THREE.Scene();

    // Set up the camera with a perspective view
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2; // Position the camera along the z-axis
    scene.add(camera); // Add the camera to the scene

    // Create the WebGL renderer and set its size
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Adjust for device pixel ratio

    // Disable auto clearing and set the background color to transparent
    renderer.autoClear = false;
    renderer.setClearColor(0xffffff, 0.0); // White background with full transparency

    // Create the geometry for the Earth
    const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

    // Create the material for the Earth with textures and properties
    const earthMaterial = new THREE.MeshPhongMaterial({
        roughness: 1,
        metalness: 0,
        map: THREE.ImageUtils.loadTexture('Images/earthmap1k.jpg'), // Texture map for the Earth
        bumpMap: THREE.ImageUtils.loadTexture('Images/earthbump.jpg'), // Bump map for surface detail
        bumpScale: 0.3 // Scale for bump mapping
    });

    // Create the Earth mesh and add it to the scene
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);

    // Create ambient light to illuminate the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight); // Add ambient light to the scene

    // Create a point light to simulate a light source in the scene
    const pointerlight = new THREE.PointLight(0xffffff, 0.9);
    pointerlight.position.set(5, 3, 5); // Position the point light
    scene.add(pointerlight); // Add point light to the scene

    // Create the geometry for the cloud layer
    const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);

    // Create the material for the clouds
    const cloudMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('Images/earthCloud.png'), // Texture map for clouds
        transparent: true // Enable transparency
    });

    // Create the cloud mesh and add it to the scene
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(cloudMesh);

    // Create the geometry for the star background
    const startGeometry = new THREE.SphereGeometry(80, 64, 64);
    
    // Create the material for the stars
    const starMaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('Images/galaxy.png'), // Texture map for stars
        side: THREE.BackSide // Render stars from the inside
    });

    // Create the star mesh and add it to the scene
    const startmesh = new THREE.Mesh(startGeometry, starMaterial);
    scene.add(startmesh);

    // Animation function to update the scene
    const animate = () => {
        requestAnimationFrame(animate); // Request the next animation frame
        // Rotate Earth and cloud meshes
        earthMesh.rotation.y -= 0.0015;
        cloudMesh.rotation.y += 0.0015;
        startmesh.rotation.y += 0.0015;

        render(); // Call the render function
    }

    // Render function to draw the scene
    const render = () => {
        renderer.render(scene, camera); // Render the scene from the camera's perspective
    }

    animate(); // Start the animation loop
}

// Call the main function when the window loads
window.onload = main;

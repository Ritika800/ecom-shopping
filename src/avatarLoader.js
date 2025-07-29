import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export function loadAvatarAndClothes(scene) {
  // Load avatar model
  loader.load('/models/68722b4b742cffebe6cece5b.glb', (gltf) => {
    const avatar = gltf.scene;
    avatar.position.set(0, 0, 0);
    avatar.scale.set(1, 1, 1);
    scene.add(avatar);

    // Load t-shirt
    loader.load('/models/tshirt.glb', (cloth) => {
      const tshirt = cloth.scene;
      tshirt.scale.set(1, 1, 1);
      tshirt.position.set(0, 1.2, 0); // Adjust to upper body
      tshirt.rotation.set(0, 0, 0);

      // Ensure meshes receive and cast shadows
      tshirt.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      avatar.add(tshirt);
    }, undefined, (err) => {
      console.error('Error loading t-shirt:', err);
    });

    // Load pants
    loader.load('/models/pant_detailed_sewing_for_factory.glb', (pant) => {
      const pants = pant.scene;
      pants.scale.set(1, 1, 1);
      pants.position.set(0, 0.5, 0); // Adjust to lower body
      pants.rotation.set(0, 0, 0);

      pants.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      avatar.add(pants);
    }, undefined, (err) => {
      console.error('Error loading pants:', err);
    });

  }, undefined, (error) => {
    console.error('Error loading avatar:', error);
  });
}

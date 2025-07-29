declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import { Loader } from 'three';
  import { Group, AnimationClip, Camera, Object3D } from 'three';

  export class GLTFLoader extends Loader {
    load(
      url: string,
      onLoad: (gltf: {
        scene: Group;
        scenes: Group[];
        animations: AnimationClip[];
        cameras: Camera[];
        asset: object;
      }) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, EventDispatcher, MOUSE, Object3D, TOUCH, Vector3 } from 'three';

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);
    object: Camera;
    domElement: HTMLElement | HTMLDocument;
    enabled: boolean;
    target: Vector3;
    update(): boolean;
    dispose(): void;
  }
}

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// Function to load the GLB model
function loadModel(modelPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const loader = new GLTFLoader();
        return new Promise((resolve, reject) => {
            loader.load(modelPath, (gltf) => {
                resolve(gltf.scene);
            }, undefined, (error) => {
                reject(error);
            });
        });
    });
}
// Function to rename bones
function renameBones(model, newNames) {
    return __awaiter(this, void 0, void 0, function* () {
        model.traverse((object) => {
            if (object instanceof THREE.Bone) {
                const newName = newNames.get(object.name);
                if (newName) {
                    object.name = newName;
                }
            }
        });
    });
}
// Function to print all bone names
function printBoneNames(model) {
    return __awaiter(this, void 0, void 0, function* () {
        model.traverse((object) => {
            if (object instanceof THREE.Bone) {
                console.log(`Bone name: ${object.name}`);
            }
        });
    });
}
// Main function to set up the scene, load the model, and rename bones
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        // Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1, 2);
        // Scene
        const scene = new THREE.Scene();
        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        // Load the model and rename bones
        const model = yield loadModel('./assets/char.glb');
        const boneNamesMap = new Map([
            //['oldBoneName1', 'newBoneName1'],
            //['oldBoneName2', 'newBoneName2'],
            // Add more bone names here
            ["Hips", "pelvis"],
            ["Spine", "spine_01"],
            ["Spine1", "spine_02"],
            ["Spine2", "spine_03"],
            ["Neck", "neck_01"],
            ["Head", "head"],
            ["HeadTop_End", "end"],
            ["LeftShoulder", "clavicle_l"],
            ["RightShoulder", "clavicle_r"],
            ["LeftArm", "upperarm_l"],
            ["RightArm", "upperarm_r"],
            ["LeftForeArm", "lowerarm_l"],
            ["RightForeArm", "lowerarm_r"],
            ["LeftHand", "hand_l"],
            ["RightHand", "hand_r"],
            ["LeftUpLeg", "thigh_l"],
            ["RightUpLeg", "thigh_r"],
            ["LeftLeg", "calf_l"],
            ["RightLeg", "calf_r"],
            ["LeftFoot", "foot_l"],
            ["RightFoot", "foot_r"],
            ["LeftToe_End", "ball_l"],
            ["RightToe_End", "ball_r"],
            ["LeftHandThumb1", "thumb_01_l"],
            ["RightHandThumb1", "thumb_01_r"],
            ["LeftHandThumb2", "thumb_02_l"],
            ["RightHandThumb2", "thumb_02_r"],
            ["LeftHandThumb3", "thumb_03_l"],
            ["LeftHandThumb4", "thumb_04_l"],
            ["RightHandThumb3", "thumb_03_r"],
            ["RightHandThumb4", "thumb_04_r"],
            ["LeftHandIndex1", "index_metacarpal_l"],
            ["RightHandIndex1", "index_metacarpal_r"],
            ["LeftHandIndex2", "index_01_l"],
            ["RightHandIndex2", "index_01_r"],
            ["LeftHandIndex3", "index_02_l"],
            ["LeftHandIndex4", "index_03_l"],
            ["RightHandIndex3", "index_02_r"],
            ["RightHandIndex4", "index_03_r"],
            ["LeftHandMiddle1", "middle_metacarpal_l"],
            ["RightHandMiddle1", "middle_metacarpal_r"],
            ["LeftHandMiddle2", "middle_01_l"],
            ["RightHandMiddle2", "middle_01_r"],
            ["LeftHandMiddle3", "middle_02_l"],
            ["LeftHandMiddle4", "middle_03_l"],
            ["RightHandMiddle3", "middle_02_r"],
            ["RightHandMiddle4", "middle_03_r"],
            ["LeftHandRing1", "ring_metacarpal_l"],
            ["RightHandRing1", "ring_metacarpal_r"],
            ["LeftHandRing2", "ring_01_l"],
            ["RightHandRing2", "ring_01_r"],
            ["LeftHandRing3", "ring_02_l"],
            ["LeftHandRing4", "ring_03_l"],
            ["RightHandRing3", "ring_02_r"],
            ["RightHandRing4", "ring_03_r"],
            ["LeftHandPinky1", "pinky_metacarpal_l"],
            ["RightHandPinky1", "pinky_metacarpal_r"],
            ["LeftHandPinky2", "pinky_01_l"],
            ["RightHandPinky2", "pinky_02_r"],
            ["LeftHandPinky3", "pinky_02_l"],
            ["LeftHandPinky4", "pinky_03_l"],
            ["RightHandPinky3", "pinky_02_r"],
            ["RightHandPinky4", "pinky_03_r"],
            ["LeftToeBase", "ankle_fwd_l"],
            ["RightToeBase", "ankle_fwd_r"],
        ]);
        yield renameBones(model, boneNamesMap);
        yield printBoneNames(model);
        scene.add(model);
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    });
}
main().catch(console.error);

import React from "react";
import * as THREE from "three";
import { Canvas, ReactThreeFiber } from "react-three-fiber";
import { Stars } from "./components/Stars";
import { CENTER_RADIUS, MIN_RADIUS, MAX_RADIUS } from "./constants";
import { Stats } from "drei";
import { Entities } from "./components/Entities/Entities";

import "./App.scss";

type CameraProps = Partial<
    ReactThreeFiber.Object3DNode<THREE.Camera, typeof THREE.Camera> &
        ReactThreeFiber.Object3DNode<THREE.PerspectiveCamera, typeof THREE.PerspectiveCamera> &
        ReactThreeFiber.Object3DNode<THREE.OrthographicCamera, typeof THREE.OrthographicCamera>
>;

const App: React.FC = () => {
    const cameraProps: CameraProps = {
        near: 0.1,
        far: CENTER_RADIUS * 100,
        position: [0, 0, THREE.MathUtils.lerp(MIN_RADIUS, MAX_RADIUS, 0.5)],
    };

    return (
        <div className="game-container">
            <Canvas
                className="game-canvas"
                camera={cameraProps}
                gl={{ antialias: false, alpha: false }}
            >
                <fog attach="fog" args={["black", 15, 1000]} />
                <ambientLight />
                <Stats />
                <Stars />
                <Entities />
            </Canvas>
        </div>
    );
};

export default App;

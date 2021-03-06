import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useFrame, CanvasContext } from "react-three-fiber";
import { CENTER_RADIUS, MAX_RADIUS, MIN_RADIUS } from "../../constants";
import { assertExists } from "../../utils/utils";
import { Vectors } from "../../utils/vectorUtils";

const ANG_VELOCITY = 2;
const RAD_VELOCITY = 1;
const MAX_ANG_STEP = 0.2;
const MAX_RAD_STEP = MIN_RADIUS;

interface AsteroidTranform {
    ang: number;
    rad: number;
    initialPosition: THREE.Vector3;
}

export interface AsteroidProps {
    id: number;
    normalVector: THREE.Vector3;
    isLive: boolean;
    dispose(): void;
}

export const Asteroid: React.FC<AsteroidProps> = ({ normalVector, isLive, dispose }) => {
    const transform = useRef<AsteroidTranform>(initialTransform(normalVector));

    const mesh = useRef<THREE.Mesh>();

    useEffect(() => {
        transform.current = initialTransform(normalVector);
    }, [normalVector]);

    useFrame((_state: CanvasContext, delta: number) => {
        assertExists(mesh.current);
        if (!isLive) {
            return;
        }

        transform.current.rad += THREE.MathUtils.clamp(delta * RAD_VELOCITY, 0, MAX_RAD_STEP);
        transform.current.ang += THREE.MathUtils.clamp(delta * ANG_VELOCITY, 0, MAX_ANG_STEP);

        const { rad, ang, initialPosition } = transform.current;

        if (rad > MAX_RADIUS) {
            transform.current = initialTransform(normalVector);
            dispose();
            return;
        }

        mesh.current.position.copy(initialPosition);
        mesh.current.position.setLength(rad);
        mesh.current.position.applyAxisAngle(normalVector, ang);
    });

    return (
        <mesh ref={mesh} visible={isLive}>
            <sphereBufferGeometry attach="geometry" args={[1, 10, 6]} />
            <meshBasicMaterial attach="material" color={0x2bfa2b} wireframe={true} />
        </mesh>
    );
};

const initialTransform = (normalVector: THREE.Vector3): AsteroidTranform => ({
    ang: 0,
    rad: CENTER_RADIUS,
    initialPosition: Vectors.randomOrthogonalUnit(normalVector),
});

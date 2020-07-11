import * as THREE from "three";

type RepeatFunction = (index: number) => void;
export const repeat = (times: number, f: RepeatFunction) => {
    for (let i = 0; i < times; i++) {
        f(i);
    }
};

export const randomUnitVector = (): THREE.Vector3 => {
    return new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
    ).normalize();
};

export type nil = null | undefined;

export const isNil = <T>(value: T | nil): value is nil => {
    return value === null || value === undefined;
};

export function assertExists<T>(value: T | nil): asserts value is T {
    if (isNil(value)) {
        throw new Error("Unexpected nil value");
    }
}

export const randomOrthogonalUnitVector = (vec: THREE.Vector3): THREE.Vector3 => {
    const x = new THREE.Vector3(1, 0, 0);
    const y = new THREE.Vector3(0, 1, 0);
    const z = new THREE.Vector3(0, 0, 1);

    const mostPerpendicular = [y, z].reduce((best, current) => {
        if (vec.dot(best) > vec.dot(current)) {
            return current;
        }
        return best;
    }, x);

    if (chance(0.5)) {
        mostPerpendicular.negate();
    }

    return new THREE.Vector3().crossVectors(vec, mostPerpendicular);
};

export const chance = (p: number): boolean => {
    return Math.random() < p;
};

type TabulateCallback<T> = (index: number) => T;
export const tabulate = <T>(count: number, factory: TabulateCallback<T>): T[] => {
    return [...new Array(count)].map((_, index) => factory(index));
};

import React, { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { Asteroid, AsteroidProps } from "./Asteroid";
import { Arrays } from "../utils/arrayUtils";
import { Vectors } from "../utils/vectorUtils";

const MAX_ASTEROIDS = 50;

export const Asteroids: React.FC = () => {
    const [asteroidsProps, spawnAsteroid] = useLiveAsteroids();

    useInterval(spawnAsteroid, 5000);

    const asteroids = asteroidsProps.map((props) => {
        return <Asteroid key={props.id} {...props} />;
    });

    return <>{asteroids}</>;
};

export type SpawnAsteroidAction = () => void;
export type DisposeAsteroidAction = (id: number) => void;

const useLiveAsteroids = (): [AsteroidProps[], SpawnAsteroidAction, DisposeAsteroidAction] => {
    const [liveAsteroids, setLiveAsteroids] = useState<Omit<AsteroidProps, "dispose">[]>(() =>
        Arrays.tabulate(MAX_ASTEROIDS, (index) => ({
            id: index,
            isLive: false,
            normalVector: Vectors.randomUnit(),
        }))
    );

    const spawnAsteroid = (): void => {
        const asteroidIndex = liveAsteroids.findIndex((props) => props.isLive === false);
        if (asteroidIndex < 0) {
            return;
        }

        const newLiveAsteroids = [...liveAsteroids];
        newLiveAsteroids[asteroidIndex].isLive = true;
        newLiveAsteroids[asteroidIndex].normalVector = Vectors.randomUnit();

        setLiveAsteroids(newLiveAsteroids);
    };

    const disposeAsteroid = (index: number): void => {
        const newLiveAsteroids = [...liveAsteroids];
        newLiveAsteroids[index].isLive = false;
        setLiveAsteroids(newLiveAsteroids);
    };

    const asteroidsProps = liveAsteroids.map((props) => ({
        ...props,
        dispose: () => disposeAsteroid(props.id),
    }));

    return [asteroidsProps, spawnAsteroid, disposeAsteroid];
};

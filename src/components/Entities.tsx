import React from "react";
import { Center } from "./Center";
import { Asteroids } from "./Asteroids";
import { Ship } from "./Ship";
import { Effects } from "./Effects";

export const Entities: React.FC = () => {
    return (
        <>
            <Center />
            <Asteroids />
            <Ship />
            <Effects />
        </>
    );
};

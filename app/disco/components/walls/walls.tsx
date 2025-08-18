import * as THREE from "three";
import React, { useMemo } from "react";

/**
 * The walls for the disco
 * @constructor
 */
export const Walls: React.FC = () => {
    const material = useMemo(() => {
        return (
            <meshPhongMaterial
                specular={new THREE.Color(0x000000)}
                color={new THREE.Color(0x272522)}
                reflectivity={0.2}
                shininess={10}
            />
        );
    }, []);
    return (
        <>
            <mesh position={[0, 0, -60]}>
                <boxGeometry args={[1000, 1000, 1]} />
                {material}
            </mesh>
            <mesh position={[0, 0, 60]}>
                <boxGeometry args={[1000, 1000, 1]} />
                {material}
            </mesh>
            <mesh position={[400, 0, 0]}>
                <boxGeometry args={[1, 1000, 1000]} />
                {material}
            </mesh>
            <mesh position={[-400, 0, 0]}>
                <boxGeometry args={[1, 1000, 1000]} />
                {material}
            </mesh>
            <mesh position={[0, -400, 0]}>
                <boxGeometry args={[1000, 1, 1000]} />
                {material}
            </mesh>
            <mesh position={[0, 400, 0]}>
                <boxGeometry args={[1000, 1, 1000]} />
                {material}
            </mesh>
        </>
    );
};

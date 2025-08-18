"use client";

import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { MeshProps, useFrame } from "@react-three/fiber";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";

/** Load the texture */
const loader = new THREE.CubeTextureLoader();
const texture = "/three/crystal.png";
const envMap = loader.load([texture, texture, texture, texture, texture, texture]);

/** Create the shiny disco ball material */
const getShinyMaterial = () =>
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 1,
        roughness: 0.2, // Slight roughness for realistic reflections
        envMap: envMap, // Add the environment map for reflections
    });

/**
 * A simple ball with the shiny disco material
 */
export const Ball: React.FC<MeshProps> = (meshProps) => {
    const shinyMaterial = useMemo(getShinyMaterial, []);
    return (
        <mesh {...meshProps} material={shinyMaterial}>
            <sphereGeometry args={[1, 32, 32]} />
            {/* Radius, width segments, height segments */}
        </mesh>
    );
};

/**
 * The central disco ball
 */
export const DiscoBall: React.FC<MeshProps> = (meshProps) => {
    const ballRef = useRef<THREE.Mesh>(null);
    const shinyMaterial = useMemo(getShinyMaterial, []);

    /**
     * Create the disco ball
     * This code is heavily inspired (copied) from here:
     * https://codepen.io/ksenia-k/pen/ZEjJxWQ
     */
    const discoBall = useMemo(() => {
        const dummy = new THREE.Object3D();
        const geometryOriginal = new THREE.IcosahedronGeometry(1, 10);
        geometryOriginal.deleteAttribute("normal");
        geometryOriginal.deleteAttribute("uv");
        const mergedGeometries = BufferGeometryUtils.mergeVertices(geometryOriginal);
        mergedGeometries.computeVertexNormals();

        const mirrorSize = 0.09;
        const mirrorGeometry = new THREE.PlaneGeometry(mirrorSize, mirrorSize);
        const instancedMirrorMesh = new THREE.InstancedMesh(
            mirrorGeometry,
            shinyMaterial,
            mergedGeometries.attributes.position.count,
        );

        const positions = mergedGeometries.attributes.position.array;
        const normals = mergedGeometries.attributes.normal.array;
        for (let i = 0; i < positions.length; i += 3) {
            dummy.position.set(positions[i], positions[i + 1], positions[i + 2]);
            dummy.lookAt(
                positions[i] + normals[i],
                positions[i + 1] + normals[i + 1],
                positions[i + 2] + normals[i + 2],
            );
            dummy.updateMatrix();
            instancedMirrorMesh.setMatrixAt(i / 3, dummy.matrix);
        }

        const obj = new THREE.Group();
        const innerGeometry = mergedGeometries.clone();
        const ballInnerMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 });
        const innerMesh = new THREE.Mesh(innerGeometry, ballInnerMaterial);
        obj.add(innerMesh, instancedMirrorMesh);

        return obj;
    }, []);

    /** Let the disco ball spin */
    useFrame(() => {
        const mesh = ballRef.current;
        if (mesh) mesh.rotation.y += 0.01;
    });

    return <primitive {...meshProps} ref={ballRef} object={discoBall} scale={1}></primitive>;
};

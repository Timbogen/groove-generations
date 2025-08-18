import * as THREE from "three";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
    AnimationScript,
    executeAnimation,
    getSectionPosition, pink, purple,
    useDebouncedResize,
} from "@/app/util";
import { TinyColor } from "@ctrl/tinycolor";

/**
 * Rotating lights for the disco scene
 */
export const Lights: React.FC = () => {
    const parentRef = useRef<THREE.Mesh>(null);
    const [firstColor, setFirstColor] = useState(new THREE.Color(pink));
    const [secondColor, setSecondColor] = useState(new THREE.Color(purple));
    const resizeCount = useDebouncedResize();

    /** The scroll animations for the light */
    const aboutPos = getSectionPosition("about");
    const servicesPos = getSectionPosition("services");
    const galleryPos = getSectionPosition("gallery");
    const contactPos = getSectionPosition("contact");
    const animations: AnimationScript[] = useMemo(() => {
        const endAnimation: AnimationScript = {
            end: Number.MAX_VALUE,
            handler: () => {
                setFirstColor(new THREE.Color(pink));
                setSecondColor(new THREE.Color(purple));
            },
        };
        if (!aboutPos || !servicesPos || !galleryPos || !contactPos) return [endAnimation];
        return [
            {
                end: aboutPos,
                handler: (progression) => {
                    const initial = new TinyColor(purple);
                    const target = new TinyColor(pink);
                    const color = initial.mix(target, progression * 100).toHexString();
                    setFirstColor(new THREE.Color(pink));
                    setSecondColor(new THREE.Color(color));
                },
            },
            {
                end: servicesPos,
                handler: (progression) => {
                    const initial = new TinyColor(pink);
                    const target = new TinyColor(purple);
                    const color = initial.mix(target, progression * 100).toHexString();
                    setFirstColor(new THREE.Color(pink));
                    setSecondColor(new THREE.Color(color));
                },
            },
            {
                end: galleryPos,
                handler: (progression) => {
                    const initial = new TinyColor(pink);
                    const target = new TinyColor(purple);
                    const color = initial.mix(target, progression * 100).toHexString();
                    setFirstColor(new THREE.Color(color));
                    setSecondColor(new THREE.Color(purple));
                },
            },
            {
                end: contactPos,
                handler: (progression) => {
                    const initial = new TinyColor(purple);
                    const target = new TinyColor(pink);
                    const color = initial.mix(target, progression * 100).toHexString();
                    setFirstColor(new THREE.Color(color));
                    setSecondColor(new THREE.Color(purple));
                },
            },
            endAnimation,
        ];
    }, [aboutPos, servicesPos, galleryPos, contactPos, resizeCount]);

    /** Execute the animations */
    useEffect(() => {
        const handleScroll = () => executeAnimation(animations, window.scrollY);
        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [animations]);

    /** Let the disco ball spin */
    useFrame(() => {
        const mesh = parentRef.current;
        if (mesh) {
            mesh.rotation.x -= 0.02;
            mesh.rotation.y -= 0.02;
        }
    });

    return (
        <mesh ref={parentRef}>
            <pointLight position={[10, 0, 10]} color={firstColor} intensity={35000} />
            <pointLight position={[-10, 0, -10]} color={firstColor} intensity={35000} />
            <pointLight position={[-10, 0, 10]} color={secondColor} intensity={35000} />
            <pointLight position={[10, 0, -10]} color={secondColor} intensity={35000} />
        </mesh>
    );
};

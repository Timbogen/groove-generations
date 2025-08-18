"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import styles from "./disco.module.scss";
import { Lights } from "@/app/disco/components/lights/lights";
import { Walls } from "./components/walls/walls";
import { useProgress } from "@react-three/drei";
import { Balls } from "@/app/disco/components/balls/balls";

/**
 * The disco background
 */
export default function Disco() {
    const { progress } = useProgress();
    const [opacity, setOpacity] = useState(0);

    /** Make the scene visible once */
    useEffect(() => {
        if (progress >= 100) setOpacity(1);
    }, [progress]);

    return (
        <div className={styles.disco} style={{ opacity }}>
            <Canvas>
                <Suspense fallback={null}>
                    <Lights />
                    <Walls />
                    <Balls />
                </Suspense>
            </Canvas>
        </div>
    );
}

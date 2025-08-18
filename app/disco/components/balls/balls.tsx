import { Ball, DiscoBall } from "@/app/disco/components/disco-ball/disco-ball";
import React, { useEffect, useState } from "react";
import { useDebouncedResize } from "@/app/util";

/**
 * Calculates the scale for the disco balls based on the window size
 */
const getScale = () => {
    if (window.innerWidth < 500) return 0.5;
    if (window.innerWidth < 700) return 0.7;
    return 1;
};

/**
 * The disco balls
 */
export const Balls: React.FC = () => {
    const [scale, setScale] = useState(getScale());
    const resizeCount = useDebouncedResize();

    /** Update scale on resize */
    useEffect(() => setScale(getScale()), [resizeCount]);

    return (
        <mesh scale={scale}>
            <DiscoBall />
            <Ball position={[-3, 0.5, 0]} scale={0.2} />
            <Ball position={[-2, 0.8, 0]} scale={0.08} />
            <Ball position={[-2.5, 1.5, 0]} scale={0.15} />
            <Ball position={[-2.4, -0.3, 0]} scale={0.13} />
            <Ball position={[2.8, 0.7, 0]} scale={0.23} />
            <Ball position={[2.4, -1.2, 0]} scale={0.17} />
            <Ball position={[2, -0.2, 0]} scale={0.12} />
            <Ball position={[3.4, -0.4, 0]} scale={0.15} />
        </mesh>
    );
};

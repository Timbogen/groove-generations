import { useEffect, useState } from "react";

/** The color spectrum */
export const pink = "#ff7354";
export const purple = "#b554ff";

/** Clamp a numeric value */
export const clamp = (number: number, min: number, max: number) => Math.min(Math.max(number, min), max);

/**
 * Returns the position of the section
 */
export const getSectionPosition = (id: string) => document.getElementById(id)?.offsetTop ?? 0;

/**
 * The interface for an animation step
 */
export interface AnimationScript {
    /** The end value that has to be reached for the animation to start */
    end: number;
    /** The handler that is executed if the animation is hit */
    handler: (progression: number) => void;
}

/**
 * Executes first matching animation
 */
export const executeAnimation = (handlers: AnimationScript[], value: number) => {
    let start = 0;
    for (const handler of handlers) {
        if (value >= start && value < handler.end) {
            const progression = (value - start) / (handler.end - start);
            handler.handler(progression);
            break;
        }
        start = handler.end;
    }
};

/**
 * Hook that returns a resize count that can be used for triggering layout changes whenever the size changes
 */
export const useDebouncedResize = () => {
    const [resizeCount, setResizeCount] = useState(0);

    /** Listen for resizes and trigger changes */
    useEffect(() => {
        const handleResize = () => {
            setTimeout(() => {
                requestAnimationFrame(() => setResizeCount((count) => count + 1));
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return resizeCount;
};

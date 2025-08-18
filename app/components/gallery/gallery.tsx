"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import clsx from "clsx";
import styles from "./gallery.module.scss";
import { EmblaCarouselType } from "embla-carousel";
import { clamp } from "@/app/util";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

/** Scale factor */
const tweenFactorBase = 0.3;

/**
 *
 * @constructor
 */
export const Gallery = () => {
    const options = { loop: true };
    const slides = ["cool", "llama", "sheep", "beer", "dd"];
    const [showCarousel, setShowCarousel] = useState(false);

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [WheelGesturesPlugin()]);
    const tweenFactor = useRef(0);
    const tweenNodes = useRef<HTMLDivElement[]>([]);

    const setTweenNodes = useCallback((emblaApi: EmblaCarouselType) => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector(`.${styles.card}`);
        }) as unknown as HTMLDivElement[];
    }, []);

    const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
        tweenFactor.current = tweenFactorBase * emblaApi.scrollSnapList().length;
    }, []);

    const tweenScale = useCallback((emblaApi: EmblaCarouselType, eventName: string) => {
        const engine = emblaApi.internalEngine();
        const scrollProgress = emblaApi.scrollProgress();
        const slidesInView = emblaApi.slidesInView();
        const isScrollEvent = eventName === "scroll";

        emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
            let diffToTarget = scrollSnap - scrollProgress;
            const slidesInSnap = engine.slideRegistry[snapIndex];

            slidesInSnap.forEach((slideIndex) => {
                if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target();

                        if (slideIndex === loopItem.index && target !== 0) {
                            const sign = Math.sign(target);

                            if (sign === -1) {
                                diffToTarget = scrollSnap - (1 + scrollProgress);
                            }
                            if (sign === 1) {
                                diffToTarget = scrollSnap + (1 - scrollProgress);
                            }
                        }
                    });
                }

                const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
                const scale = clamp(tweenValue, 0, 1);
                const tweenNode = tweenNodes.current[slideIndex];
                if (tweenNode) tweenNode.style.transform = `scale(${scale > 0.5 ? scale : 0})`;
            });
        });
        setShowCarousel(true);
    }, []);

    /** Init the carousel */
    useEffect(() => {
        if (!emblaApi) return;

        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenScale(emblaApi, "");

        emblaApi
            .on("reInit", setTweenNodes)
            .on("reInit", setTweenFactor)
            .on("reInit", tweenScale)
            .on("scroll", tweenScale)
            .on("slideFocus", tweenScale);
    }, [emblaApi, tweenScale, setTweenNodes, setTweenFactor]);

    return (
        <div className={styles.gallery} style={{ opacity: showCarousel ? 1 : 0 }}>
            <div ref={emblaRef}>
                <div className={styles.container}>
                    {slides.map((value, index) => (
                        <div className={styles.slide} key={index}>
                            <div className={clsx(styles.card, "glass", "blue")}>
                                <img alt={value} src={`/img/${value}.png`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

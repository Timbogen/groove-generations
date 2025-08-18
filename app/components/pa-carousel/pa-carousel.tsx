"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import clsx from "clsx";
import styles from "./pa-carousel.module.scss";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

export const PACarousel = () => {
    const options = { loop: true };
    const slides = ["everse-bundle", "everse12"];

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [WheelGesturesPlugin()]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (!emblaApi) return;
            emblaApi.scrollTo(index);
        },
        [emblaApi],
    );

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className={clsx(styles.carousel, "glass")}>
            <div ref={emblaRef}>
                <div className={styles.container}>
                    {slides.map((value, index) => (
                        <div className={styles.slide} key={index}>
                            <div className={clsx(styles.card)}>
                                <img alt={`PA System ${index + 1}`} src={`/img/${value}.png`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.dots}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={clsx(styles.dot, {
                            [styles.active]: index === selectedIndex,
                        })}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

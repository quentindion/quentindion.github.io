import { motion, useAnimation, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../utils";

export default function TimelineDot ({timelineRef, className}: {className?: string, timelineRef: RefObject<HTMLDivElement | null>}) {

    const ref = useRef<HTMLDivElement>(null);

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => setIsMounted(true), []);

    const [ratio, setRatio] = useState(0);

    useLayoutEffect(() => {
        if (!ref.current || !timelineRef.current)
            return;

        const dotRect = ref.current.getBoundingClientRect();
        const parentRect = timelineRef.current.parentElement!.getBoundingClientRect();

        const y = dotRect.top - parentRect.top;

        setRatio(y / parentRect.height);
    }, [ref.current, timelineRef.current]);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 75%", "end 75%"]
    });

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.01],
        [
            "var(--color-background)",
            `color-mix(
                in oklab,
                var(--color-accent) ${(1 - ratio) * 100}%,
                var(--color-primary)
            )`
        ]
    );

    const borderColor = useTransform(
        scrollYProgress,
        [0, 1],
        ["var(--color-border)", "var(--color-background)"]
    );

    const controls = useAnimation();
    const hasPlayed = useRef<boolean>(false);

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (v === 0)
            hasPlayed.current = false;
        else if(!hasPlayed.current) {
            hasPlayed.current = true;
            controls.start({
                scale: [1, 1.5, 1],
                transition: {
                    duration: 0.4,
                    ease: "easeInOut"
                }
            });
        }
    });

    return <motion.div ref={ref} initial={{ scale: 1 }} animate={controls} 
        style={{
            backgroundColor: isMounted ? backgroundColor : "var(--color-background)",
            borderColor: isMounted ? borderColor : "var(--color-border)"
        }}
        className={cn(
            "relative rounded-full size-4 border-2 border-border transition-colors",
            "bg-background ring-2 ring-background",
            className
        )}
    />
}
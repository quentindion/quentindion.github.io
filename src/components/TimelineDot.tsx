import { motion, useAnimation, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "cn";

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

    const { size, offset, color, borderWidth, borderColor, boxShadow } = useTransform(
        scrollYProgress,
        [0, 0.01],
        {
            size: [16, 12],
            offset: [4, 6],
            color: [
                "var(--color-background)",
                `color-mix(in oklch longer hue, var(--color-timeline-start) ${Math.round((1 - ratio) * 100)}%, var(--color-timeline-end))`
            ],
            borderWidth: [2, 0],
            borderColor: ["var(--color-border)", "var(--color-background)"],
            boxShadow: ["0 0 0 var(--tw-shadow-color)", `var(--timeline-dot-shadow-from) currentColor, var(--timeline-dot-shadow-to) currentColor`]
        }
    );

    const controls = useAnimation();
    const hasPlayed = useRef<boolean>(false);

    useMotionValueEvent(scrollYProgress, "change", value => {
        if (value === 0)
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

    return <div className="relative">
        <motion.div className="relative rounded-full size-6 bg-background" />
        <motion.div ref={ref} initial={{ scale: 1 }} animate={controls} 
            className={cn("absolute rounded-full border-border transition-colors bg-current shadow-foreground", className)}
            style={{
                width: isMounted ? size : 16,
                height: isMounted ? size : 16,
                top: isMounted ? offset : 4,
                left: isMounted ? offset : 4,
                color: isMounted ? color : "var(--color-background)",
                borderWidth: isMounted ? borderWidth : 2,
                borderColor: isMounted ? borderColor : "var(--color-border)",
                boxShadow: isMounted ? boxShadow : "0 0 0 var(--tw-shadow-color)"
            }} />
    </div> 
}
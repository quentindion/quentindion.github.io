import { cn } from "cn";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { HTMLProps, useCallback, useRef } from "react";

export type CardProps = HTMLProps<HTMLElement> & {
    mousePosition: {
        x: MotionValue<number>,
        y: MotionValue<number>
    }
}

export default function Card ({children, className, mousePosition}: CardProps) {

    const ref = useRef<HTMLDivElement>(null);

    const { scrollY, scrollX } = useScroll();
    
    const bounds = useCallback(() => ref.current?.getBoundingClientRect(), []);

    const relativeX = useTransform<number, string>([mousePosition.x, scrollX], ([x]) => `${x - (bounds()?.left ?? 0)}px`);
    const relativeY = useTransform<number, string>([mousePosition.y, scrollY], ([y]) => `${y - (bounds()?.top ?? 0)}px`);

    return <motion.div ref={ref} className={cn("card", className)} style={{"--spotlight-x": relativeX, "--spotlight-y": relativeY}}>
        <div className="relative p-4 size-full rounded-[inherit] transition-all
            dark:bg-background bg-background/98 not-dark:backdrop-blur-xl">
            {children}
        </div>
    </motion.div>
}
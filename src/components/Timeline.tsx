import { HTMLProps, useRef } from "react";
import { type Experience } from "../App";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "cn";
import TimelineDot from "./TimelineDot";

export default function Timeline ({items, className}: HTMLProps<HTMLElement> & {items: Experience[]}) {

    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 75%", "end 75%"]
    });

    const lineHeight = useSpring(scrollYProgress);
    const clampedLineHeight = useTransform(lineHeight, [0, 1], [0, 1], {clamp: true});

    return <motion.div ref={ref} className={cn("relative", className)}>

        <motion.div className="absolute w-0.5 h-full top-0 left-2.75 sm:left-28.75 bg-linear-to-b/longer z-1 origin-top
            from-timeline-start to-timeline-end" 
            style={{scaleY: clampedLineHeight}} />

        {items.map(({dates, title, company, description}, i) => <div key={i} className="relative flex flex-col">
            {dates[0] && <h3 className="flex sm:flex-row-reverse w-32 mb-0 text-muted">
                <div className="motion-fade-scale" style={{zIndex: items.length - i}}>
                    <TimelineDot timelineRef={ref} />
                </div>
                <div className="flex-1 motion-fade-right">{dates[0]}</div>
            </h3>}
            <div className="flex flex-col items-start pl-6 ml-2.75 sm:ml-28.75 pb-8 border-l-2 border-border">
                <h3 className="mt-4 sm:-mt-4.5 motion-fade-left">{title}</h3>
                {company && <h3 className="motion-fade-left">{company}</h3>}
                <p className="text-muted leading-4 motion-fade-left">{description}</p>
            </div>
            {dates[1] && (dates[1] !== items[i + 1].dates[0]) && 
                <h3 className="flex sm:flex-row-reverse w-32 mb-4 text-muted">
                    <div className="motion-fade-scale" style={{zIndex: items.length - i}}>
                        <TimelineDot timelineRef={ref} />
                    </div>
                    <div className="flex-1 motion-fade-right">{dates[1]}</div>
                </h3>}
        </div>)}
    </motion.div>
}
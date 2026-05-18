import { HTMLProps, useRef } from "react";
import { type Experience } from "../App";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "../utils";
import TimelineDot from "./TimelineDot";

export default function Timeline ({items, className}: HTMLProps<HTMLElement> & {items: Experience[]}) {

    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 75%", "end 75%"]
    });

    const lineHeight = useSpring(scrollYProgress);

    return <div ref={ref} className={cn("relative contain-paint", className)}>

        <motion.div className="absolute w-0.5 h-full top-0 left-1.75 sm:left-29.75 bg-linear-to-b from-accent to-primary z-1 origin-top" 
            style={{scaleY: lineHeight}} />

        {items.map(({dates, title, company, description}, i) => <div key={i} className="relative flex flex-col">
            {dates[0] && <h3 className="flex sm:flex-row-reverse w-32 mb-0 text-muted">
                <div className="motion-fade-scale z-1">
                    <TimelineDot timelineRef={ref} />
                </div>
                <div className="flex-1 motion-fade-right">{dates[0]}</div>
            </h3>}
            <div className="flex flex-col items-start pl-6 ml-1.75 sm:ml-29.75 pb-8 border-l-2 border-border">
                <h3 className="mt-4 sm:-mt-4.5 motion-fade-left">{title}</h3>
                {company && <h3 className="motion-fade-left">{company}</h3>}
                <p className="text-muted leading-4 motion-fade-left">{description}</p>
            </div>
            {dates[1] && (dates[1] !== items[i + 1].dates[0]) && 
                <h3 className="flex sm:flex-row-reverse w-32 mb-4 text-muted">
                    <div className="motion-fade-scale z-1">
                        <TimelineDot timelineRef={ref} />
                    </div>
                    <div className="flex-1 motion-fade-right">{dates[1]}</div>
                </h3>}
        </div>)}
    </div>
}
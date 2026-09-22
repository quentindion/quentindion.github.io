import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "cn";

type InfiniteLoopsProps = {
    className?: string
    duration?: number
    direction?: "right" | "left"
    children: React.ReactNode
}

export default function InfiniteLoops ({className, duration = 10, direction = "left", children}: InfiniteLoopsProps) {

    const [height, setHeight] = useState<CSSProperties["height"]>("auto");

    const [loopsInstances, setLoopsInstances] = useState(1);
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const setupInstances = useCallback(() => {
        if(innerRef?.current && outerRef?.current) {

            const {width, height} = innerRef.current.getBoundingClientRect();
    
            setHeight(`${height}px`);
    
            const {width: parentWidth} = outerRef.current.getBoundingClientRect();
    
            const instanceWidth = width / innerRef.current.children.length;
    
            if(width < (parentWidth + instanceWidth))
                setLoopsInstances(loopsInstances + Math.ceil(parentWidth / width));
        }
    }, [loopsInstances]);

    useEffect(() => {
        
        setupInstances();

        window.addEventListener("resize", setupInstances);

        return () => { window.removeEventListener("resize", setupInstances); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className={cn("relative w-full h-(--infinite-loops-height) overflow-hidden hover:[&_.animate-infinite-loops]:[animation-play-state:paused]", className)} 
        style={{"--infinite-loops-height": height!}} ref={outerRef}>
        <div className="absolute flex left-0 top-0 animate-infinite-loops" ref={innerRef} style={{
            "--infinite-loops": 1 / loopsInstances,
            animationDuration: `${duration}s`,
            animationDirection: direction === "right" ? "reverse" : "normal"
        }}>
        {[...Array(loopsInstances)].map((_, i) => 
            <div key={i} className="flex *:ml-12" style={{animationDuration: `${duration}s`, animationDirection: direction === "right" ? "reverse" : "normal"}}>
                {children}
            </div>
        )}
        </div>
    </div>
}
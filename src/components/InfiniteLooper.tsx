import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../utils";

type InfiniteLooperProps = {
    className?: string
    duration?: number
    direction?: "right" | "left"
    children: React.ReactNode
}

export default function InfiniteLooper({className, duration = 10, direction = "left", children}: InfiniteLooperProps) {

    const [height, setHeight] = useState<CSSProperties["height"]>("auto");

    const [looperInstances, setLooperInstances] = useState(1);
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const setupInstances = useCallback(() => {
        if(innerRef?.current && outerRef?.current) {

            const {width, height} = innerRef.current.getBoundingClientRect();
    
            setHeight(`${height}px`);
    
            const {width: parentWidth} = outerRef.current.getBoundingClientRect();
    
            const instanceWidth = width / innerRef.current.children.length;
    
            if(width < (parentWidth + instanceWidth))
                setLooperInstances(looperInstances + Math.ceil(parentWidth / width));
        }
    }, [looperInstances]);

    useEffect(() => {
        
        setupInstances();

        window.addEventListener("resize", setupInstances);

        return () => { window.removeEventListener("resize", setupInstances); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className={cn("relative w-full h-(--looper-height) overflow-hidden hover:[&_.animate-looper]:[animation-play-state:paused]", className)} style={{"--looper-height": height!}} ref={outerRef}>
        <div className="absolute flex left-0 top-0 animate-looper" ref={innerRef} style={{
            "--looper-loops": 1 / looperInstances,
            animationDuration: `${duration}s`,
            animationDirection: direction === "right" ? "reverse" : "normal"
        }}>
        {[...Array(looperInstances)].map((_, i) => 
            <div key={i} className="flex *:ml-12" style={{animationDuration: `${duration}s`, animationDirection: direction === "right" ? "reverse" : "normal"}}>
                {children}
            </div>
        )}
        </div>
    </div>
}